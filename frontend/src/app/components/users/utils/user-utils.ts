import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../interface/user.interface';

export class UserUtils {

  public static getFormArrayControlsFromUsers(users: IUser[]): FormGroup[] {
    return users.map((user: IUser) => this.getUserFormGroup(user));
  }
  public static getUserFormGroup(user?: IUser): FormGroup {
    return new FormGroup({
      firstName: new FormControl(user?.firstName, [Validators.required]),
      lastName: new FormControl(user?.lastName, [Validators.required]),
      streetName: new FormControl(user?.streetName, [Validators.required]),
      houseNumber: new FormControl(user?.houseNumber, [Validators.required]),
      apartmentNumber: new FormControl(user?.apartmentNumber),
      postalCode: new FormControl(user?.postalCode, [Validators.required]),
      town: new FormControl(user?.town, [Validators.required]),
      phoneNumber: new FormControl(user?.phoneNumber, [Validators.required]),
      dateOfBirth: new FormControl(user?.dateOfBirth, [Validators.required]),
      age: new FormControl({ value: user?.age, disabled: !!user }, [Validators.required]),
    })
  }
}
