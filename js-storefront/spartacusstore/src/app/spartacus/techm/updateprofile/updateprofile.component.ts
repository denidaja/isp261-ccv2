import { Component, OnInit } from '@angular/core';
import { Address, Currency, Language } from '@spartacus/core';
import { UpdateProfileComponent, UpdateProfileComponentService } from '@spartacus/user/profile/components';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { filter } from 'rxjs/operators';
export interface User {
  currency?: Currency;
  customerId?: string;
  deactivationDate?: Date;
  defaultAddress?: Address;
  displayUid?: string;
  firstName?: string;
  language?: Language;
  lastName?: string;
  name?: string;
  title?: string;
  titleCode?: string;
  uid?: string;
  roles?: string[];
  loyaltyPoint?: Number;
  loyaltyHistory: any[];
}


@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.scss']
})
export class UpdateprofileComponent extends UpdateProfileComponent implements OnInit {

  loyalty: any;
  userData: any;
  loyaltyHistory: any[] = [];
  edit: boolean = false;
  showLoyaltyHistory: boolean = false;
  constructor(protected service: UpdateProfileComponentService,
    protected userProfile: UserProfileFacade) {
    super(service)
  }
  protected user$ = this.userProfile
    .get()
    .pipe(filter((user): user is User => Boolean(user)));
  ngOnInit(): void {
    this.user$.subscribe(data => {
      this.userData = data;
      this.loyalty = data.loyaltyPoint;
      this.loyaltyHistory = data.loyaltyHistory;
      console.log(this.loyaltyHistory);
    });
  }

  doEdit() {
    this.edit = !this.edit;
  }

  doShowLoyaltyHistory() {
    this.showLoyaltyHistory = !this.showLoyaltyHistory;
  }
}
