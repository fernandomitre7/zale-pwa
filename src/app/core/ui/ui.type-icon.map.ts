
export const TYPE_ICON_MAP: any = {
    'restaurant': 'restaurant',
    'library': 'local_library',
    'generic-store': 'store',
    'market': 'shopping_cart',
    'cafe': 'local_cafe',
    'bar': 'local_bar',
    'apparel': 'local_offer',
    'fastfood': 'fastfood',
    'pizzeria': 'local_pizza',
    'gas-station': 'local_gas_station'
};

export function getIcon(type: string): string {
    return TYPE_ICON_MAP[type];
};

