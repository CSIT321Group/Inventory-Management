package CSIT321.CN03.Service.DataInitialisation;

import CSIT321.CN03.Model.Enums.Order_Status;
import CSIT321.CN03.Model.Order.Order;
import CSIT321.CN03.Model.Order.Order_Item;
import CSIT321.CN03.Model.Stock.Stock;
import CSIT321.CN03.Model.Supplier;
import CSIT321.CN03.Model.Warehouse;
import CSIT321.CN03.Repository.Order.OrderRepository;
import CSIT321.CN03.Repository.Stock.StockRepository;
import CSIT321.CN03.Repository.SupplierRepository;
import CSIT321.CN03.Repository.WarehouseRepository;
import CSIT321.CN03.Service.Statistics.OrderStatisticsService;
import CSIT321.CN03.Utils.DateUtils;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderInitializationService {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private WarehouseRepository warehouseRepository;
    @Autowired
    private OrderStatisticsService orderStatisticsService;

    public void initializeOrders() {
        Warehouse warehouse = warehouseRepository.findAll().get(0);
        List<Stock> allStocks = stockRepository.findAll();
        Random rand = new Random();
        List<Order> newOrders = new ArrayList<>();

        for (int i = 0; i < 50; i++) {
            Order order = new Order();
            Date orderDate = DateUtils.randomOrderDate();
            order.setOrderDate(orderDate);
            order.setDeliveryDate(DateUtils.randomDeliveryDate(orderDate));
            order.setStatus(Order_Status.PENDING);
            order.setInternalOrder(rand.nextBoolean());
            order.setSupplier(getRandomSupplier());
            order.setWarehouse(warehouse);

            // Randomly pick multiple stocks for this order
            Set<Order_Item> orderItems = rand.ints(0, allStocks.size()).limit(rand.nextInt(4) + 1)
                    .mapToObj(idx -> createOrderItem(allStocks.get(idx)))
                    .collect(Collectors.toSet());

            for (Order_Item orderItem : orderItems) {
                order.getOrderItems().add(orderItem);     // Add Order_Item to Order's set
                orderItem.setOrder(order);                // Set the Order reference in Order_Item
            }

            newOrders.add(order);

        }

        orderRepository.saveAll(newOrders);

        int x = 0;

        System.out.println("Setting order statuses...");
        for (Order order : newOrders) {
            x++;
            double chance = rand.nextDouble();
            if (chance <= 0.05) {
                order.setStatus(Order_Status.PENDING);
            } else if (chance <= 0.10) {
                order.setStatus(Order_Status.PROCESSING);
            } else if (chance <= 0.20) {
                order.setStatus(Order_Status.SHIPPED);
            } else if (chance <= 0.98) {
                order.setStatus(Order_Status.DELIVERED);
            } else {
                order.setStatus(Order_Status.CANCELLED);
            }
        }

        long startTime = System.currentTimeMillis();
        // Save all the updated orders in a batch
        orderRepository.saveAll(newOrders);
        long endTime = System.currentTimeMillis();
        System.out.println("Operation took: " + (endTime - startTime) + " ms");

        System.out.println("Order statuses set.");
        orderStatisticsService.printDeliveryStatsForSupplier(1L);
        orderStatisticsService.printDeliveryStatsForSupplier(2L);
    }

    private Order_Item createOrderItem(Stock stock) {
        Order_Item orderItem = new Order_Item();
        orderItem.setStock(stock);
        orderItem.setQuantity(new Random().nextInt(5) + 1);  // Random quantity from 1 to 5
        orderItem.setUnitPrice(stock.getUnit_price());
        return orderItem;
    }

    private Supplier getRandomSupplier() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers.get(new Random().nextInt(suppliers.size()));
    }
}

