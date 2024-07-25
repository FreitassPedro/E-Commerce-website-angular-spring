package com.pedro.ecommerce.dto;

import lombok.Data;

// Use this class to send back response JSON
@Data
public class PurchaseResponse {

    private final String orderTrackingNumber;

}
