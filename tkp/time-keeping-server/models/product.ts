export interface Product {
    _id: string
    name: string
    brand: string
    id: string
    isActive: boolean
    userEdit: string
    createdAt: string
    updatedAt: string
    description: string
    tags: string[]
    image: string
    color: string
    isFeatured: boolean
    isPopular: boolean
    isNew: boolean
    isOnSale: boolean
    averageRating: number
    reviewCount: number
    category: string
    subCategory: string
    price: number
    currency: string
    discount: number
    quantity: number
    availability: boolean
    weight: number
    dimensions: Dimensions
    ingredients?: string[]
    countryOfOrigin: string
    nutritionFacts?: NutritionFacts
    reviews: Review[]
    displaySize?: string
    storageCapacity?: string
    camera?: string
    operatingSystem?: string
    features?: string[]
    material?: string
    resolution?: string
    smartFeatures?: string[]
    displayType?: string
    heartRateMonitor?: boolean
    waterResistance: any
    activityTracking?: string[]
    scent?: string
    skinType?: string
    processor?: string
    roastLevel?: string
    origin?: string
    flavorNotes?: string[]
    technology?: string
    sensorSize?: string
    isoRange?: string
    focusType?: string
    heartRateMonitoring?: boolean
    gps?: boolean
    graphics?: string
    sleepTracking?: boolean
    wirelessType?: string
    batteryLife?: string
    noiseCancellation?: boolean
    voiceControl?: string
    brewingTechnology?: string
    coffeeSize?: string[]
    waterTankCapacity?: string
    videoResolution?: string
    photoResolution?: string
    imageStabilization?: boolean
    screenSize?: number
    suctionPower?: string
    dustBinCapacity?: string
    runTime?: string
    capacity?: string
    cookingPrograms?: string[]
}

export interface Dimensions {
    width: number
    height: number
    depth: number
}

export interface NutritionFacts {
    servingSize: string
    calories: number
    totalFat: string
    sodium: string
    totalCarbohydrate: string
    sugars: string
    protein: string
}

export interface Review {
    username: string
    rating: number
    comment: string
}

export class Product {
    constructor() {
        this._id = '';
        this.name = '';
        this.brand = '';
        this.id = '';
        this.isActive = false;
        this.userEdit = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.description = '';
        this.tags = [];
        this.image = '';
        this.color = '';
        this.isFeatured = false;
        this.isPopular = false;
        this.isNew = false;
        this.isOnSale = false;
        this.averageRating = 0;
        this.reviewCount = 0;
        this.category = '';
        this.subCategory = '';
        this.price = 0;
        this.currency = '';
        this.discount = 0;
        this.quantity = 0;
        this.availability = false;
        this.weight = 0;
        this.dimensions = new Dimensions();
        this.ingredients = [];
        this.countryOfOrigin = '';
        this.nutritionFacts = new NutritionFacts();
        this.reviews = [];
        this.displaySize = '';
        this.storageCapacity = '';
        this.camera = '';
        this.operatingSystem = '';
        this.features = [];
        this.material = '';
        this.resolution = '';
        this.smartFeatures = [];
        this.displayType = '';
        this.heartRateMonitor = false;
        this.waterResistance = null;
        this.activityTracking = [];
        this.scent = '';
        this.skinType = '';
        this.processor = '';
        this.roastLevel = '';
        this.origin = '';
        this.flavorNotes = [];
        this.technology = '';
        this.sensorSize = '';
        this.isoRange = '';
        this.focusType = '';
        this.heartRateMonitoring = false;
        this.gps = false;
        this.graphics = '';
        this.sleepTracking = false;
        this.wirelessType = '';
        this.batteryLife = '';
        this.noiseCancellation = false;
        this.voiceControl = '';
        this.brewingTechnology = '';
        this.coffeeSize = [];
        this.waterTankCapacity = '';
        this.videoResolution = '';
        this.photoResolution = '';
        this.imageStabilization = false;
        this.screenSize = 0;
        this.suctionPower = '';
        this.dustBinCapacity = '';
        this.runTime = '';
        this.capacity = '';
        this.cookingPrograms = [];
    }
}

export class Dimensions {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.depth = 0;
    }
}

export class NutritionFacts {
    constructor() {
        this.servingSize = '';
        this.calories = 0;
        this.totalFat = '';
        this.sodium = '';
        this.totalCarbohydrate = '';
        this.sugars = '';
        this.protein = '';
    }
}

export class Review {
    constructor() {
        this.username = '';
        this.rating = 0;
        this.comment = '';
    }
}