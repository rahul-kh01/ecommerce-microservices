package com.demo.consumer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RiderLocation {
    private String riderId;
    private Double latitude;
    private Double longitude;
}