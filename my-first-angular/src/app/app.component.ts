import { faFaceSmile, faFaceAngry } from '@fortawesome/free-regular-svg-icons';
import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentIcon: IconProp = faFaceAngry

  getAnIcon() {
    setTimeout(() => {
      this.currentIcon = this.currentIcon === faFaceAngry ? faFaceSmile : faFaceAngry
    }, 3000)

  }
}
