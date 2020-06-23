import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as usuariosActions from '../actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuariosSuccess } from '../actions';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
 
     constructor(
         private actions$: Actions,
         private usuarioServices: UsuarioService
     ) {        
    }


    cargarUsuarios$ = createEffect(
        ()=> this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap(
                () => this.usuarioServices.getUsers()
                    .pipe(
                        map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users})),
                        catchError( err => of ( usuariosActions.cargarUsuariosError({ payload: err}) ))
                    )
            )
        )
    );

}