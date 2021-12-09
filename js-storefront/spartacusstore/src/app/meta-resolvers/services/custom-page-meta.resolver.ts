import { Injectable } from '@angular/core';
import {
  BasePageMetaResolver,
  Page,
  PageLinkService,
  PageType,
  ProductPageMetaResolver,
  ProductService,
  RoutingService,
  TranslationService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { PageKeywordResolver } from '../models/page-keyword.resolver';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CEProductPageMetaResolver
  extends ProductPageMetaResolver
  implements PageKeywordResolver
{
  constructor(
    protected routingService: RoutingService,
    protected productService: ProductService,
    protected translation: TranslationService,
    protected basePageMetaResolver: BasePageMetaResolver,
    protected pageLinkService: PageLinkService
  ) {
    super(
      routingService,
      productService,
      translation,
      basePageMetaResolver,
      pageLinkService
    );
    this.pageType = PageType.PRODUCT_PAGE;
    console.log('Custom MEta REsolvelsr');
  }

  resolveKeywords(): Observable<string> {
    return this.product$.pipe(map((product) => product.manufacturer));
  }

  getScore(page: Page): number {
    return super.getScore(page) + 1;
  }
}
