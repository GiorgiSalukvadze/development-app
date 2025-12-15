import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Building, Floor, Unit, Project } from '../models/property.models';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Your converted JSON data matching the TypeScript structure
private realFloorPolygons = [
  {
    id: "floor-1",
    name: "Floor 1",
    svgPoints: "83,717 601,697 598,675 83,678",
    status: "available" as const,
    floorNumber: 1,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [
      {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }
    ]
  },
  {
    id: "floor-2",
    name: "Floor 2",
    svgPoints: "85,679 601,676 601,652 89,642",
    status: "available" as const,
    floorNumber: 2,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-3",
    name: "Floor 3",
    svgPoints: "86,643 600,654 599,632 87,607",
    status: "available" as const,
    floorNumber: 3,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-4",
    name: "Floor 4",
    svgPoints: "87,606 600,632 598,607 87,571",
    status: "sold" as const,
    floorNumber: 4,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-5",
    name: "Floor 5",
    svgPoints: "89,571 597,610 595,586 89,536",
    status: "available" as const,
    floorNumber: 5,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-6",
    name: "Floor 6",
    svgPoints: "89,536 597,587 594,565 90,501",
    status: "available" as const,
    floorNumber: 6,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-7",
    name: "Floor 7",
    svgPoints: "89,500 597,567 595,545 91,466",
    status: "available" as const,
    floorNumber: 7,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "sold" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "sold" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-8",
    name: "Floor 8",
    svgPoints: "92,465 595,545 593,528 94,431",
    status: "available" as const,
    floorNumber: 8,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "sold" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "sold" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-9",
    name: "Floor 9",
    svgPoints: "90,430 597,524 594,500 91,396",
    status: "available" as const,
    floorNumber: 9,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-10",
    name: "Floor 10",
    svgPoints: "94,397 594,501 592,479 93,361",
    status: "available" as const,
    floorNumber: 10,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-11",
    name: "Floor 11",
    svgPoints: "91,361 593,480 592,463 92,330",
    status: "available" as const,
    floorNumber: 11,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-12",
    name: "Floor 12",
    svgPoints: "92,329 593,461 591,441 92,294",
    status: "available" as const,
    floorNumber: 12,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-13",
    name: "Floor 13",
    svgPoints: "94,295 592,440 591,416 93,262",
    status: "available" as const,
    floorNumber: 13,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-14",
    name: "Floor 14",
    svgPoints: "92,259 592,418 590,398 94,225",
    status: "available" as const,
    floorNumber: 14,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-15",
    name: "Floor 15",
    svgPoints: "93,225 592,396 589,374 95,193",
    status: "available" as const,
    floorNumber: 15,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-16",
    name: "Floor 16",
    svgPoints: "94,192 590,377 590,354 96,149",
    status: "available" as const,
    floorNumber: 16,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-17",
    name: "Floor 17",
    svgPoints: "95,146 590,351 590,334 98,124",
    status: "available" as const,
    floorNumber: 17,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-18",
    name: "Floor 18",
    svgPoints: "94,124 588,333 588,313 96,91",
    status: "available" as const,
    floorNumber: 18,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-19",
    name: "Floor 19",
    svgPoints: "94,93 589,314 587,295 96,60",
    status: "available" as const,
    floorNumber: 19,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  },
  {
    id: "floor-20",
    name: "Floor 20",
    svgPoints: "96,59 588,295 588,271 96,23",
    status: "available" as const,
    floorNumber: 20,
    floorPlanImage: "assets/floor-a.jpg",
    floorPlanViewBox: "0 0 1227 836",
    unitPolygons: [  {
        id: "unit-1a",
        name: "Unit 101",
        svgPoints: "17,258 129,257 129,388 144,388 145,402 161,404 161,429 121,429 122,419 20,419", // Your coordinates from the tool
        status: "available" as const,
        area: 85,
        bedrooms: 2,
        bathrooms: 1,
        price: 250000
      },
        {
    id: "polygon-1765450743413",
    name: "unit 102",
    svgPoints: "129,256 234,259 233,403 146,404 146,387 126,387",
    status: "available" as const,
    area: 91,
    bedrooms: 1,
    bathrooms: 1,
    price: 120000
  },
      {
    id: "polygon-1765450999524",
    name: "Unit 103",
   svgPoints: "234,258 333,255 335,404 235,405",
    status: "sold" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },{
    id: "polygon-1765451198732",
    name: "Unit 1",
    svgPoints: "465,261 573,256 575,401 468,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451212477",
    name: "Unit 2",
    svgPoints: "571,259 676,261 676,261 676,261 682,403 580,402",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451234597",
    name: "Unit 3",
    svgPoints: "676,259 844,262 843,365 770,366 771,404 684,400",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451247037",
    name: "Unit 4",
    svgPoints: "887,258 989,260 990,405 888,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451257034",
    name: "Unit 5",
    svgPoints: "991,261 1088,259 1090,405 990,405",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451283500",
    name: "Unit 6",
    svgPoints: "1090,260 1215,259 1212,417 1150,420 1150,413 1117,412 1116,401 1092,401",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451317536",
    name: "Unit 7",
    svgPoints: "20,421 121,421 122,427 158,426 215,436 225,461 220,545 19,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451326915",
    name: "Unit 8",
    svgPoints: "226,435 372,437 370,542 224,544",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451340572",
    name: "Unit 9",
    svgPoints: "373,436 467,437 470,543 373,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451348426",
    name: "Unit 10",
    svgPoints: "467,437 573,436 576,546 471,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451356527",
    name: "Unit 11",
    svgPoints: "572,437 680,438 680,545 575,545",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451374868",
    name: "Unit 12",
    svgPoints: "679,437 780,439 781,545 684,546",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451392147",
    name: "Unit 13",
    svgPoints: "780,438 930,435 936,580 783,582",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451399981",
    name: "Unit 14",
    svgPoints: "935,438 1092,436 1088,582 935,586",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  },
  {
    id: "polygon-1765451411831",
    name: "Unit 15",
    svgPoints: "1091,434 1116,432 1117,409 1209,418 1212,578 1091,577",
    status: "available" as const,
    area: 100,
    bedrooms: 2,
    bathrooms: 1,
    price: 100000
  }]
  }
];
  private storageKey = 'property-project-cache';
  private demoProject: Project = {
    id: 'project-1',
    name: 'Sunset Residences',
    description: 'Luxury apartments with stunning city views',
    buildings: [
      {
        id: 'building-1',
        name: 'Tower A',
        address: '123 Development Ave, City Center',
        description: 'Premium residential tower',
        totalFloors: 2,
        renderImage: 'assets/town-a.jpeg',
        floors: this.generateFloorsFromPolygons()
      }
    ]
  };

  private project$ = new BehaviorSubject<Project>(this.demoProject);
  private selectedBuilding$ = new BehaviorSubject<Building | null>(null);
  private selectedFloor$ = new BehaviorSubject<Floor | null>(null);
  private selectedUnit$ = new BehaviorSubject<Unit | null>(null);

  constructor() {
    const cached = this.loadFromStorage();
    if (cached) {
      this.project$.next(cached);
    } else {
      this.project$.next(this.demoProject);
      this.persistToStorage(this.demoProject);
    }
  }

  private generateFloorsFromPolygons(): Floor[] {
    return this.realFloorPolygons.map(polygonData => {
      const floorUnits = this.generateUnitsFromPolygons(polygonData);
      const floorStatus = floorUnits.every(u => u.status === 'sold') 
        ? 'sold' 
        : 'available';

      return {
        id: polygonData.id,
        buildingId: 'building-1',
        floorNumber: polygonData.floorNumber,
        name: polygonData.name,
        status: floorStatus,
        polygonPoints: polygonData.svgPoints,
        floorPlanImage: polygonData.floorPlanImage,
        floorPlanViewBox: polygonData.floorPlanViewBox,
        units: floorUnits
      };
    });
  }

  private generateUnitsFromPolygons(floorData: any): Unit[] {
  if (floorData.unitPolygons && floorData.unitPolygons.length > 0) {
    return floorData.unitPolygons.map((unitData: any, index: number) => ({
      id: `${floorData.id}-${unitData.id || `unit-${index + 1}`}`,
      name: unitData.name || `Unit ${floorData.floorNumber}${String.fromCharCode(97 + index)}`,
      floorId: floorData.id,
      status: unitData.status || 'available',
      area: unitData.area || 75 + (index * 15),
      bedrooms: unitData.bedrooms || (index <= 1 ? 2 : 3),
      bathrooms: unitData.bathrooms || (index <= 1 ? 1 : 2),
      price: unitData.price || 150000 + (floorData.floorNumber * 10000) + (index * 25000),
      polygonPoints: unitData.svgPoints,  // This is what matters!
      description: unitData.description || `Beautiful ${unitData.bedrooms || (index <= 1 ? 2 : 3)} bedroom apartment on floor ${floorData.floorNumber}`,
      features: [
        'Central heating',
        'Air conditioning',
        'Balcony',
        'Parking space',
        index % 2 === 0 ? 'City view' : 'Garden view'
      ]
    }));
  }
  // Fallback to generated units if no polygon data
  return this.generateUnitsForFloor(floorData.id, floorData.floorNumber);
}

  private generateUnitsForFloor(floorId: string, floorNumber: number): Unit[] {
    const units: Unit[] = [];
    const unitCount = 4; // 4 units per floor
    
    for (let i = 1; i <= unitCount; i++) {
      // Randomize status for demo - only available or sold
      const statusOptions: ('available' | 'sold')[] = ['available', 'sold'];
      const randomStatus = statusOptions[Math.floor(Math.random() * 2)];
      
      units.push({
        id: `${floorId}-unit-${i}`,
        name: `Unit ${floorNumber}0${i}`,
        floorId: floorId,
        status: randomStatus,
        area: 75 + (i * 15), // Varying sizes
        bedrooms: i <= 2 ? 2 : 3,
        bathrooms: i <= 2 ? 1 : 2,
        price: 150000 + (floorNumber * 10000) + (i * 25000),
        polygonPoints: this.getUnitPolygonPoints(i),
        description: `Beautiful ${i <= 2 ? '2' : '3'} bedroom apartment on floor ${floorNumber}`,
        features: [
          'Central heating',
          'Air conditioning',
          'Balcony',
          'Parking space',
          i > 2 ? 'City view' : 'Garden view'
        ]
      });
    }
    
    return units;
  }

  private getUnitPolygonPoints(unitNumber: number): string {
    // Floor plan is divided into 4 quadrants for units
    // Viewbox is 800x600
    const positions: { [key: number]: string } = {
      
    };
    
    return positions[unitNumber] || positions[1];
  }

  // Public methods
  getProject(): Observable<Project> {
    return this.project$.asObservable();
  }

  getBuilding(buildingId: string): Observable<Building | undefined> {
    const building = this.project$.value.buildings.find(b => b.id === buildingId);
    return of(building);
  }

  getFloor(buildingId: string, floorId: string): Observable<Floor | undefined> {
    const building = this.project$.value.buildings.find(b => b.id === buildingId);
    const floor = building?.floors.find(f => f.id === floorId);
    return of(floor);
  }

  getUnit(floorId: string, unitId: string): Observable<Unit | undefined> {
    for (const building of this.project$.value.buildings) {
      const floor = building.floors.find(f => f.id === floorId);
      if (floor) {
        const unit = floor.units.find(u => u.id === unitId);
        if (unit) return of(unit);
      }
    }
    return of(undefined);
  }

  // Selection state management
  selectBuilding(building: Building | null): void {
    this.selectedBuilding$.next(building);
    this.selectedFloor$.next(null);
    this.selectedUnit$.next(null);
  }

  selectFloor(floor: Floor | null): void {
    this.selectedFloor$.next(floor);
    this.selectedUnit$.next(null);
  }

  selectUnit(unit: Unit | null): void {
    this.selectedUnit$.next(unit);
  }

  getSelectedBuilding(): Observable<Building | null> {
    return this.selectedBuilding$.asObservable();
  }

  getSelectedFloor(): Observable<Floor | null> {
    return this.selectedFloor$.asObservable();
  }

  getSelectedUnit(): Observable<Unit | null> {
    return this.selectedUnit$.asObservable();
  }

  // Admin mutations
  markUnitSold(buildingId: string, floorId: string, unitId: string): Observable<Unit | undefined> {
    const project = JSON.parse(JSON.stringify(this.project$.value)) as Project;
    const floor = this.findFloor(project, buildingId, floorId);
    if (!floor) return of(undefined);

    const unit = floor.units.find(u => u.id === unitId);
    if (!unit) return of(undefined);

    unit.status = 'sold';
    this.updateFloorStatus(floor);
    this.commitProject(project);
    return of(unit);
  }

  markUnitAvailable(buildingId: string, floorId: string, unitId: string): Observable<Unit | undefined> {
    const project = JSON.parse(JSON.stringify(this.project$.value)) as Project;
    const floor = this.findFloor(project, buildingId, floorId);
    if (!floor) return of(undefined);

    const unit = floor.units.find(u => u.id === unitId);
    if (!unit) return of(undefined);

    unit.status = 'available';
    this.updateFloorStatus(floor);
    this.commitProject(project);
    return of(unit);
  }

  markFloorSold(buildingId: string, floorId: string): Observable<Floor | undefined> {
    const project = JSON.parse(JSON.stringify(this.project$.value)) as Project;
    const floor = this.findFloor(project, buildingId, floorId);
    if (!floor) return of(undefined);

    floor.units = floor.units.map(u => ({ ...u, status: 'sold' }));
    floor.status = 'sold';
    this.commitProject(project);
    return of(floor);
  }

  updateUnitDetails(
    buildingId: string,
    floorId: string,
    unitId: string,
    changes: Partial<Pick<Unit, 'name' | 'price' | 'status' | 'condition' | 'description' | 'area' | 'bedrooms' | 'bathrooms' | 'features'>>
  ): Observable<Unit | undefined> {
    const project = JSON.parse(JSON.stringify(this.project$.value)) as Project;
    const floor = this.findFloor(project, buildingId, floorId);
    if (!floor) return of(undefined);

    const unitIndex = floor.units.findIndex(u => u.id === unitId);
    if (unitIndex === -1) return of(undefined);

    const updatedUnit = { ...floor.units[unitIndex], ...changes };
    floor.units[unitIndex] = updatedUnit;
    this.updateFloorStatus(floor);
    this.commitProject(project);
    return of(updatedUnit);
  }

  resetProject(): void {
    this.project$.next(this.demoProject);
    this.persistToStorage(this.demoProject);
  }

  // Statistics
  getBuildingStats(building: Building): { available: number; sold: number; total: number } {
    let available = 0, sold = 0;
    
    building.floors.forEach(floor => {
      floor.units.forEach(unit => {
        if (unit.status === 'available') available++;
        else sold++;
      });
    });
    
    return { available, sold, total: available + sold };
  }

  private updateFloorStatus(floor: Floor): void {
    floor.status = floor.units.every(u => u.status === 'sold') ? 'sold' : 'available';
  }

  private findFloor(project: Project, buildingId: string, floorId: string): Floor | undefined {
    const building = project.buildings.find(b => b.id === buildingId);
    return building?.floors.find(f => f.id === floorId);
  }

  private commitProject(project: Project): void {
    this.project$.next(project);
    this.persistToStorage(project);
  }

  private persistToStorage(project: Project): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(project));
    } catch (err) {
      console.warn('Failed to persist project cache', err);
    }
  }

  private loadFromStorage(): Project | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) as Project : null;
    } catch {
      return null;
    }
  }
}
