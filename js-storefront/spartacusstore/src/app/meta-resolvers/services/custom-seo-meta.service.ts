import { Injectable } from '@angular/core';
import { PageMetaLinkService, SeoMetaService } from '@spartacus/storefront';
import { Meta, Title } from '@angular/platform-browser';
import { PageMeta, PageMetaService } from '@spartacus/core';

@Injectable({ providedIn: 'root' })
export class CustomSeoMetaService extends SeoMetaService {
  constructor(
    protected ngTitle: Title,
    protected ngMeta: Meta,
    protected pageMetaService: PageMetaService,
    protected pageMetaLinkService?: PageMetaLinkService
  ) {
    super(ngTitle, ngMeta, pageMetaService, pageMetaLinkService);
  }

  protected set meta(meta: PageMeta) {
    super.meta = meta;
    //@ts-ignore
    this.keywords = meta['keywords'];
    console.log('META:', meta);
  }

  protected set keywords(keywords: string | undefined) {
    if (keywords) {
      this.addTag({ name: 'keywords', content: keywords });
    } else {
      this.ngMeta.removeTag('name="keywords"');
    }
  }
}
