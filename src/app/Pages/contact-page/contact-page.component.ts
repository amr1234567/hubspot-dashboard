import { Component } from '@angular/core';
import datesMappingProvider from '../../../Constants/dates-maping';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  providers: [datesMappingProvider]
})
export class ContactPageComponent {

}
