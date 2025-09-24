import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      tipoDoc: ['', Validators.required],
      numDoc: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]],
      nombreUser: [{ value: '', disabled: true }], 
    });

    this.registerForm.get('email')?.valueChanges.subscribe(email => {
      if (email && email.includes('@')) {
        const user = email.split('@')[0];
        this.registerForm.get('nombreUser')?.setValue(user, { emitEvent: false });
      } else {
        this.registerForm.get('nombreUser')?.setValue('', { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      //Validaciones el numero de documento, nombre del usuario no se pueden repetir 
      //el rol por defecto sera de Lider
      const formData = this.registerForm.getRawValue()
      console.log('Datos de registro:', formData);
      // Aquí puedes llamar a tu servicio de registro
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
