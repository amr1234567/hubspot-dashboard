import { ChangeDetectionStrategy, Component, inject, input, output, signal, type OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OwnersService } from '../../../../../../Services/Owners.service';
import { Owner } from '../../../../../../Models/owner.model';

@Component({
  selector: 'app-owner-drop-down',
  standalone: true,
  imports: [],
  templateUrl: './OwnerDropDown.component.html',
  styleUrl: './OwnerDropDown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': "dropdown-container"
  }
})
export class OwnerDropDownComponent implements OnInit {

  private onwersServices = inject(OwnersService)
  ngOnInit(): void { }

  owners = toSignal(this.onwersServices.owners$);
  selectedOption = input<Owner | null>()
  dropdownOpen = signal(false);
  selectOnwer = output<Owner | null>()

  onSelectOwner(ownerId: string) {
    const owner = this.owners()?.find(o => o.id === ownerId);
    if (owner) {
      this.selectOnwer.emit(owner);
    } else {
      this.selectOnwer.emit(null);
    }
    this.dropdownOpen.update(v => !v);
  }

  onToggleDropdown() {
    this.dropdownOpen.update((v) => !v);
  }

  get getOwnerName(): string {
    const owner = (this.owners() ?? []).find((o) => o.id === this.selectedOption()?.id);
    return owner ? owner.name : '';
  }
}
