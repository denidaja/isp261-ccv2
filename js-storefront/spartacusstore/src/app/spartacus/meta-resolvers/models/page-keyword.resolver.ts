import { Observable } from 'rxjs';

export interface PageKeywordResolver {
  /**
   * Resolves the page keywords
   */
  resolveKeywords(): Observable<string | undefined>;
}
