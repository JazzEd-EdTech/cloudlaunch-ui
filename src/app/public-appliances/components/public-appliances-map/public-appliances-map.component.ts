import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';

import { PublicService } from '../../../shared/models/public_service';

@Component({
    selector: 'public-appliances-map',
    templateUrl: './public-appliances-map.component.html',
    styleUrls: ['./public-appliances-map.component.css']
})
export class PublicAppliancesMapComponent {
    @Input()
    publicServices: Observable<PublicService[]>;
    
    styles =
        [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#444444"}]
        }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{"saturation": -100}, {"lightness": 45}]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{"visibility": "simplified"}]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{"visibility": "off"}]
        }, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#4f595d"}, {"visibility": "on"}]}];

    center_latitude = 18;
    center_longitude = 0;
    zoom = 2;
}