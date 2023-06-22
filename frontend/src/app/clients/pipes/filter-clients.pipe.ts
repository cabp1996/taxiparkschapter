import { Pipe, PipeTransform } from '@angular/core';
import { Client } from '../../shared/interfaces';

@Pipe({
  name: 'filterClients',
})
export class FilterClientsPipe implements PipeTransform {
  transform(clients: Client[], searchText: string): Client[] {
    return clients.filter((client) =>
      `${client.name + ' ' + client.lastName}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }
}
