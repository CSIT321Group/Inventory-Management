package CSIT321.CN03.Service.Statistics;

import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Repository.Order.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.OptionalDouble;

@Service
public class OrderStatisticsService {

    @Autowired
    private OrderRepository orderRepository;

    public void printDeliveryStatsForSupplier(Long supplierId) {
        List<Order> orders = orderRepository.findAllBySupplierId(supplierId);
        System.out.println("Retrieved " + orders.size() + " orders for Supplier ID: " + supplierId);

        // Ensure we have orders to process
        if (orders.isEmpty()) {
            System.out.println("No orders found for the supplier.");
            return;
        }

        long fastestDeliveryTime = Long.MAX_VALUE;
        long slowestDeliveryTime = Long.MIN_VALUE;
        long totalDeliveryTime = 0;

        for (Order order : orders) {
            long deliveryTime = order.getDeliveryDate().getTime() - order.getOrderDate().getTime();
            if (deliveryTime < fastestDeliveryTime) {
                fastestDeliveryTime = deliveryTime;
            }
            if (deliveryTime > slowestDeliveryTime) {
                slowestDeliveryTime = deliveryTime;
            }
            totalDeliveryTime += deliveryTime;
        }

        OptionalDouble averageDeliveryTime = orders.stream()
                .mapToLong(o -> o.getDeliveryDate().getTime() - o.getOrderDate().getTime())
                .average();
        System.out.println("Statistics for Supplier: " + orders.get(0).getSupplier().getSupplierName());
        System.out.println("Fastest Order Delivery Time (in days): " + millisToDays(fastestDeliveryTime));
        System.out.println("Slowest Order Delivery Time (in days): " + millisToDays(slowestDeliveryTime));
        System.out.println("Average Order Delivery Time (in days): " + (averageDeliveryTime.isPresent() ? millisToDays(averageDeliveryTime.getAsDouble()) : "N/A"));
    }

    private double millisToDays(double millis) {
        return millis / (1000.0 * 60.0 * 60.0 * 24.0);
    }
}

