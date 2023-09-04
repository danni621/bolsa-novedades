import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";

@Injectable({
    providedIn: 'root'
})
export class PdfService {

    constructor() { }

    GenerarFactura() {
        const doc = new jsPDF({
            orientation: "landscape",
        });

        let x = 10;
        let y = 10;

        doc.setFont('Arial');
        doc.setFontSize(12);

        doc.addImage('../../assets/img/interrapidisimo.jpg', 'JPEG', x, y, 60, 30);

        doc.cell(x, y, 120, 10, 'sdfdfdgdfgfgfdgdsfgsghsgfhsdgfjdsgfhdsgfsjdgfdsgfhsdjfgj', 0, 'center');
        doc.cell(x + 10, y, 40, 10, 'sdf', 0, 'center');
        window.open(doc.output('bloburl'), '_blank');
        //doc.save('mi-documento.pdf');

    }
}
