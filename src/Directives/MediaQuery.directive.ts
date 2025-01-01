import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[mediaQuery]',
  standalone: true
})
export class MediaQueryDirective implements OnInit, OnDestroy {
  @Input({ required: true }) mediaQuery!: string;

  private mediaQueryList?: MediaQueryList;
  private isViewCreated = false;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<unknown>
  ) { }

  ngOnInit(): void {
    if (!this.mediaQuery) {
      console.warn('MediaQueryDirective: No media query provided.');
      return;
    }

    this.mediaQueryList = window.matchMedia(this.mediaQuery);

    // Listen to media query changes
    fromEvent<MediaQueryListEvent>(this.mediaQueryList, 'change')
      .pipe(
        throttleTime(400),
        takeUntil(this.destroy$)
      )
      .subscribe(({ matches }) => this.updateView(matches));

    // Initial check
    this.updateView(this.mediaQueryList.matches);
  }

  private updateView(matches: boolean): void {
    if (matches && !this.isViewCreated) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.isViewCreated = true;
    } else if (!matches && this.isViewCreated) {
      this.viewContainerRef.clear();
      this.isViewCreated = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
