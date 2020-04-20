import {inject, TestBed} from '@angular/core/testing';
import {CategoryService} from './category.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Category} from '../shared/models/category';

describe('TestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CategoryService],
  }));

  it('should be created', () => {
    const service: CategoryService = TestBed.get(CategoryService);
    expect(service).toBeTruthy();
  });
  it('should get list categories', inject([CategoryService, HttpTestingController],
    (service: CategoryService, backend: HttpTestingController) => {
    const mockCategories: Category[] = [{_id: 'test', name: 'Test'}];
    expect(service).toBeTruthy();
    service.getCategoryList().subscribe(categories => {
      expect(categories).toEqual(mockCategories);
    });

    backend.expectOne({
      method: 'GET',
      url: '/categories'
    }).flush(mockCategories);
  }));
});
