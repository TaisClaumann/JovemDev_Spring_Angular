import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../services/corrida.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit{

  public corridas: Corrida[] = [];

  constructor(private service: CorridaService, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.corridas = data;
    });
    this.service.corridaSubject.subscribe((data) => {
      this.getCorridaFiltrada(data);
    })
  }

  public getCorridaFiltrada(corrida: Corrida){
    this.corridas = [];
    this.corridas.push(corrida);
  }

  public delete(corrida: Corrida) {
    this.service.delete(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.corridas = data;
      })
    });
  }

  private formataData(data: string) {
    const newDate = this.parseStringToDate(data);
    return this.datePipe.transform(newDate, 'yyyy-MM-ddTHH:mm');
  }

  private parseStringToDate(data: string): Date {
    const [dataPart, horaPart] = data.split(' ');
    const [dia, mes, ano] = dataPart.split('/');
    const [hora, minuto] = horaPart.split(':');
    return new Date(Number(ano), Number(mes) - 1, Number(dia), Number(hora), Number(minuto));
  }

  public getCorridaSelect(corrida: Corrida) {
    const dataFormatada = this.formataData(corrida.data);
    if(dataFormatada){
      corrida.data = dataFormatada;
      this.service.getCorridaSelect(corrida);
    }
  }
}
