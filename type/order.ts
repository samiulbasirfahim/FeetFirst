export type OrderAddress = {
    id: number;
    first_name: string;
    last_name: string;
    street_address: string;
    address_line2: string;
    postal_code: string;
    city: string;
    phone_number: string;
    country: string;
    comments: string;
    user: number;
};

export type OrderDetails = {
    color: string;
    size_id: number;
    size: string;
    quantity: number;
    image: string;
    address: OrderAddress;
};

export type OrderItem = {
    id: number;
    order_id: string;
    customer: string;
    product: string;
    status: string;
    price: string;
    product_id: number;
    net_amount: string;
    tracking: string;
    created_at: string;
    details: OrderDetails;
    sub_category: string;
    title: string;
    match_data: {
        score: number;
    };
};

export type OrderListResponse = OrderItem[];
