import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SolicitudFormularioService } from '../../servicios/solicitud-formulario/solicitud-formulario.service';
import { ProfesionalesService } from '../../servicios/profesionales.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrl: './contactanos.component.css'
})
export class ContactanosComponent {
  formularioForm;
  datos_formulario: any;
  solicitudes_profesionales: any;
  constructor(private formBuild: FormBuilder, private solicitudFormularioSrv:SolicitudFormularioService, private solicitudProfesionalSrv:ProfesionalesService){
    this.formularioForm = this.formBuild.group({
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      mensaje: ''
    });
  }
  ngOnInit(){
    this.obtenerSolicitudesProfesionales();
  }
  enviarDatos(){
    this.solicitudFormularioSrv.registrarFormulario(this.formularioForm.value).subscribe(
      (response:any) => {
        
        this.datos_formulario = response.solicitud_formulario
        console.log(this.datos_formulario);        
        alert("Datos guardados correctamente");
        this.formularioForm.reset();
      },error => {
        console.log(error);
      }
    )   
  }
  obtenerSolicitudesProfesionales(){
    this.solicitudProfesionalSrv.obtenerProfesionales().subscribe(
      (response:any) => {        
        this.solicitudes_profesionales = response.profesionales;          
        console.log(this.solicitudes_profesionales);
      }, error => {
        console.log(error);
      }
    )
  }

}
