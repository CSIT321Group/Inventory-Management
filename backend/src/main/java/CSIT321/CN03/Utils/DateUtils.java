package CSIT321.CN03.Utils;

import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

public class DateUtils {

    public static Date randomOrderDate() {
        long current = System.currentTimeMillis();
        return new Date(current);
    }

    public static Date randomDeliveryDate(Date orderDate) {
        // Most of the delivery dates will be between 2 and 3 days,
        // but we allow a range between 1 and 10 days.
        int randomDay = getRandomWeightedDeliveryDay();
        long randomTime = randomDay * 24L * 60L * 60L * 1000L;
        return new Date(orderDate.getTime() + randomTime);
    }

    private static int getRandomWeightedDeliveryDay() {
        int day = ThreadLocalRandom.current().nextInt(1, 11);
        // Increase the probability of 2 and 3
        if (day >= 4 && day <= 6) {
            day = 2;
        } else if (day >= 7 && day <= 9) {
            day = 3;
        }
        return day;
    }
}
