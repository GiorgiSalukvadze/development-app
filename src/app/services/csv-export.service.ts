import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CsvExportService {

    constructor() { }

    downloadFile(data: any[], filename: string = 'data') {
        if (!data || !data.length) {
            return;
        }

        const csvData = this.convertToCSV(data);
        const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        const dwldLink = document.createElement('a');
        const url = URL.createObjectURL(blob);
        const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

        if (isSafariBrowser) {  // if Safari open in new window to save file with random filename.
            dwldLink.setAttribute('target', '_blank');
        }

        dwldLink.setAttribute('href', url);
        dwldLink.setAttribute('download', filename + '.csv');
        dwldLink.style.visibility = 'hidden';
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }

    private convertToCSV(objArray: any[]): string {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = '';

        // Extract headers
        const headerList = Object.keys(array[0]);
        for (const index in headerList) {
            row += headerList[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';

        // Extract body
        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (const index in headerList) {
                const head = headerList[index];
                let value = array[i][head];

                // Handle null/undefined
                if (value === null || value === undefined) {
                    value = '';
                }

                // Convert to string and sanitise key characters
                value = value.toString();
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }

                line += value + ',';
            }
            str += line.slice(0, -1) + '\r\n';
        }
        return str;
    }
}
