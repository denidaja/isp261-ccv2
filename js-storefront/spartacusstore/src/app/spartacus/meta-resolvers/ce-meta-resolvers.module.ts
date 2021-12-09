import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageMetaResolver, provideDefaultConfig } from '@spartacus/core';
import { customMetaResolverConfig } from './config/custom-meta-resolver.config';
import { CEProductPageMetaResolver } from './services/custom-page-meta.resolver';
import { CustomSeoMetaService } from './services/custom-seo-meta.service';
import { SeoMetaService } from '@spartacus/storefront';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class CEMetaResolversModule {
  static forRoot(): ModuleWithProviders<CEMetaResolversModule> {
    return {
      ngModule: CEMetaResolversModule,
      providers: [
        {
          provide: SeoMetaService,
          useExisting: CustomSeoMetaService,
        },
        {
          provide: PageMetaResolver,
          useExisting: CEProductPageMetaResolver,
          multi: true,
        },
        provideDefaultConfig(customMetaResolverConfig),
      ],
    };
  }
}
