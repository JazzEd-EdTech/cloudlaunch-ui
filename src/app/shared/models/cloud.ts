export interface Cloud {
    id: string;
    slug: string;
    name: string;
    cloud_type: string;
    region_name: string;
    extra_data: {};
}

export interface VmType {
    id: string;
    name: string;
}

export interface Region {
    id: string;
    name: string;
}

export interface PlacementZone {
    id: string;
    name: string;
}

export interface KeyPair {
    id: string;
    name: string;
}

export interface Network {
    id: string;
    name: string;
}

export interface SubNet {
    id: string;
    name: string;
}

export interface StaticIP {
    id: string;
    ip: string;
}

export interface CloudManCluster {
    id: number;
    cluster_name: string;
    placement: string;
    bucket_name: string;
}
