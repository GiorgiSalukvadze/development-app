import { Pipe, PipeTransform } from '@angular/core';
import { Unit, UnitStatus } from '../models/property.models';

@Pipe({
  name: 'filterByStatus',
  standalone: true
})
export class FilterByStatusPipe implements PipeTransform {
  transform(units: Unit[], status: UnitStatus): number {
    return units.filter(unit => unit.status === status).length;
  }
}
