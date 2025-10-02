import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Fire } from '../../services/fire';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-work-teams',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './work-teams.html',
  styleUrl: './work-teams.css'
})
export class WorkTeams implements OnInit {
  groupForm: FormGroup;
  mostrarFormulario = false;
  grupos: any[] = [];
  numDocUsuario!: string;
  creando = false; // Para deshabilitar el botón de crear

  private fb = inject(FormBuilder);
  private workTeamsService = inject(Fire);
  private auth = inject(Auth);
  private userService = inject(AuthService);

  constructor() {
    this.groupForm = this.fb.group({
      nombreGrupo: ['', Validators.required],
      descripcion: [''],
    });
  }

  async ngOnInit() {
    Swal.fire({
      title: 'Cargando grupos...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const user = this.auth.currentUser;
    if (user) {
      const userData = await this.userService.getUserByEmail(user.email!);
      this.numDocUsuario = userData?.numDoc;

      // Ahora cada grupo tendrá ya miRol cargado desde el servicio
      this.grupos = await this.workTeamsService.getMisGrupos(this.numDocUsuario);
    }

    Swal.close();
  }

  async crearGrupo() {
    if (this.groupForm.invalid) {
      this.groupForm.markAllAsTouched();
      return;
    }

    const { nombreGrupo, descripcion } = this.groupForm.value;

    // Confirmación antes de crear
    const confirm = await Swal.fire({
      title: '¿Crear nuevo grupo?',
      text: `Se creará el grupo "${nombreGrupo}"`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    this.creando = true; // desactivar botón
    Swal.fire({
      title: 'Creando grupo...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    try {
      await this.workTeamsService.crearGrupo(nombreGrupo, descripcion);

      // recargar los grupos después de crear uno nuevo
      this.grupos = await this.workTeamsService.getMisGrupos(this.numDocUsuario);

      Swal.fire({
        icon: 'success',
        title: 'Grupo creado',
        text: `El grupo "${nombreGrupo}" fue creado correctamente`,
        timer: 2000,
        showConfirmButton: false
      });

      this.groupForm.reset();
      this.mostrarFormulario = false;
    } catch (err: any) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      this.creando = false;
    }
  }
}
