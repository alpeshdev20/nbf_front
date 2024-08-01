interface PackageCover {
    content: string;
  }
  
  interface Package {
    id: number;
    title: string;
    price: number;
    package_covers: PackageCover[];
  }
  
  interface SubCategory {
    id: number;
    title: string;
    packages: Package[];
  }
  
  interface Plan {
    id: number;
    category: string;
    sub_category: SubCategory[];
  }