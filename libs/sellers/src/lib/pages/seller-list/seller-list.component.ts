import { Component, OnInit } from '@angular/core';
import { Seller } from '../../models';
import { SellerService } from '../../services/sellers.service';
@Component({
  selector: 'generators-nx-meetup-seller-list',
  templateUrl: './seller-list.component.html',
  styleUrls: ['./seller-list.component.scss'],
})
export class SellerListComponent implements OnInit {
  sellers: Seller[] = [];
  loading: boolean = true;
  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.getCustomersLarge().then((sellers) => {
      this.sellers = sellers;
      this.loading = false;
    });
  }
}
