import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'star'})
export class starPipe implements PipeTransform {
  transform(inp: string, shown: boolean): string {
    return shown ? inp : [...inp].map(() => '*').join('');
  }
}
