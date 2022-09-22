import { Component, VERSION } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Desafio Caixa Eletrônico';
  valor: number = 0;
  cedulas = [100, 50, 20, 10];
  retorno: string = '';
  retornoArray = [];

  constructor(public dialog: MatDialog) {}

  ind(numero): void {
    let valorStr;
    valorStr = this.valor.toString() + numero.toString();
    this.valor = Number(valorStr);
  }

  limpar(): void {
    this.valor = 0;
    this.retorno = '';
    this.retornoArray = [];
  }

  cancelar(): void {
    this.valor = 0;
    this.retorno = '';
    this.retornoArray = [];
  }

  confimar(): void {
    let valor = this.valor;
    this.retorno = '';
    this.retornoArray = [];

    for (let i = 0; i < this.cedulas.length; i++) {
      if (valor >= this.cedulas[i]) {
        this.retornoArray.push({
          quantidade: Math.trunc(valor / this.cedulas[i]),
          cedula: this.cedulas[i],
        });
        this.retorno =
          this.retorno +
          ' <br /> ' +
          (Math.trunc(valor / this.cedulas[i]) +
            ' nota(s) de ' +
            this.cedulas[i]);
        valor = valor % this.cedulas[i];
      }
    }

    if (valor > 0) {
      this.valor = 0;
      this.retorno = '';
      this.retornoArray = [];
      this.error();
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  error(): void {
    Swal.fire(
      'Valor inválido',
      'Notas disponíveis de R$ 100, R$ 50, R$ 20 e R$ 10',
      'info'
    );
  }
}
