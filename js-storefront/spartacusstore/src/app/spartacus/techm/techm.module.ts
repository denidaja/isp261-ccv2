import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ConfigModule, I18nModule, UrlModule } from "@spartacus/core";
import { FormErrorsModule, SpinnerModule } from "@spartacus/storefront";
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nModule,
    FormErrorsModule,
    RouterModule,
    UrlModule,
    ConfigModule.withConfig({
      cmsComponents: {
        UpdateProfileComponent: {
          component: UpdateprofileComponent,
        },
      },
    }),
  ],
  providers: [
    //   provideDefaultConfig(<CmsConfig>{
    //     cmsComponents: {
    //       UpdateProfileComponent: {
    //         component: UpdateprofileComponent,
    //         guards: [AuthGuard],
    //         providers: [
    //           {
    //             provide: UpdateProfileComponentService,
    //             useClass: UpdateProfileComponentService,
    //             deps: [UserProfileFacade, GlobalMessageService],
    //           },
    //         ],
    //       },
    //     },
    //   }),
  ],
  declarations: [


    UpdateprofileComponent
  ]
})
export class TechMModule { }