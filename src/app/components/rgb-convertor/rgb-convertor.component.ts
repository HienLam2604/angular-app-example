import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { rgb } from 'src/app/models/rgb.model';

@Component({
  selector: 'rgb-convertor',
  templateUrl: './rgb-convertor.component.html',
  styleUrls: ['./rgb-convertor.component.scss'],
})
export class RgbConvertorComponent implements OnInit {
  rgbConvertorForm!: FormGroup;
  result: rgb[] = [];

  ngOnInit(): void {
    this.createForm();
    this.getLocalStorage();
  }

  getLocalStorage() {
    const storedValue = localStorage.getItem('rgbConvertor');
    if (storedValue !== null) {
      this.result = JSON.parse(storedValue);
    }
  }

  //Default form value
  createForm() {
    this.rgbConvertorForm = new FormGroup({
      r: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(255),
        Validators.pattern('^[0-9]*$'),
      ]),
      g: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(255),
        Validators.pattern('^[0-9]*$'),
      ]),
      b: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(255),
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  convertRgb() {
    const { r, g, b } = this.rgbConvertorForm.value;
    const hexColor = this.rgbToHex(Number(r), Number(g), Number(b)); // Convert values to numbers
    const tmpValue: rgb = {
      rgb: `(${r}, ${g}, ${b})`,
      hexColor: hexColor,
    };
    this.result.unshift(tmpValue);
    this.rgbConvertorForm.reset();
    localStorage.setItem('rgbConvertor', JSON.stringify(this.result));
  }

  rgbToHex(r: number, g: number, b: number): string {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = (x ?? 0)?.toString(16); //converts the number to a hexadecimal string.
          return hex?.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  }
}
