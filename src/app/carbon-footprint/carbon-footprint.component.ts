import { Component } from '@angular/core';
import { CarbonFootprintComputeService } from '../services/carbon-footprint-compute.service';
@Component({
  selector: 'app-carbon-footprint',
  templateUrl: './carbon-footprint.component.html',
  styleUrls: ['./carbon-footprint.component.css']
})
export class CarbonFootprintComponent {
  distanceKm: number = 50;
  consommationPour100Km: number = 5;
  quantiteCO2Totale:number=0;
  voyages = this.carbonFootprintComputeService.getVoyages();

  constructor(private carbonFootprintComputeService:CarbonFootprintComputeService) {
     this.calculerMoyenneKMEtConsomationMoy();
  }
  ajouter100KM() {
    this.distanceKm += 100;
  }
  ajouterUnVoyage() {
    var distanceKMRanfom: number = Math.floor(Math.random() * 1000) + 1;
    var consommationPour100Km: number = Math.floor(Math.random() * 20) + 1;
    var quantiteCO2:number= (distanceKMRanfom * consommationPour100Km) / 100 * 2.3
    var voyage={ "distanceKm": distanceKMRanfom, 'consommationPour100Km': consommationPour100Km,'quantiteCO2':quantiteCO2 }
    this.carbonFootprintComputeService.addVoyage(voyage);
    this.voyages = this.carbonFootprintComputeService.getVoyages();
    this.calculerMoyenneKMEtConsomationMoy();   
  }

  calculerMoyenneKMEtConsomationMoy() {
    let resume = this.carbonFootprintComputeService.getResumeVoyages();
    this.distanceKm = resume.distanceKm;
    this.consommationPour100Km = resume.consommationPour100Km;
    this.quantiteCO2Totale = resume.quantiteCO2Totale;
  }
  
  ngOnInit() {
    console.log('Le composant a été initialisé.');
  }

  ngOnDestroy() {
    console.log('Le composant a été détruit.');
  }

  ngAfterContentInit() {
    console.log('Le contenu du composant a été initialisé.');
  }

  ngAfterContentChecked() {
    this.calculerMoyenneKMEtConsomationMoy();
    console.log('Le contenu du composant est vérifié.');
  }

  ngAfterViewInit() {
    console.log('La vue du composant a été initialisée.');
  }

  ngAfterViewChecked() {
    console.log('La vue du composant a été vérifiée.');
  }
}
