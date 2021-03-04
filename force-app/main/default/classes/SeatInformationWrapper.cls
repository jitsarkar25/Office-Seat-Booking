//
//

public class SeatInformationWrapper {

    public String status {get;set;} 
    public List<Seat_information> seat_information {get;set;} 

    public SeatInformationWrapper(JSONParser parser) {
        while (parser.nextToken() != System.JSONToken.END_OBJECT) {
            if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                String text = parser.getText();
                if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                    if (text == 'status') {
                        status = parser.getText();
                    } else if (text == 'seat_information') {
                        seat_information = arrayOfSeat_information(parser);
                    } else {
                        System.debug(LoggingLevel.WARN, 'SeatInformationWrapper consuming unrecognized property: '+text);
                        consumeObject(parser);
                    }
                }
            }
        }
    }
    
    public class Seat_information {
        public String seatId {get;set;} 
        public Integer totalTimesBooked {get;set;} 
        public Integer totalTimesOccupied {get;set;} 
        public String lastBookedDate {get;set;} 
        public String speciality {get;set;} 
        public Double averageRating {get;set;} 

        public Seat_information(JSONParser parser) {
            while (parser.nextToken() != System.JSONToken.END_OBJECT) {
                if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
                    String text = parser.getText();
                    if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
                        if (text == 'seatId') {
                            seatId = parser.getText();
                        } else if (text == 'totalTimesBooked') {
                            totalTimesBooked = parser.getIntegerValue();
                        } else if (text == 'totalTimesOccupied') {
                            totalTimesOccupied = parser.getIntegerValue();
                        } else if (text == 'lastBookedDate') {
                            lastBookedDate = parser.getText();
                        } else if (text == 'speciality') {
                            speciality = parser.getText();
                        } else if (text == 'averageRating') {
                            averageRating = parser.getDoubleValue();
                        } else {
                            System.debug(LoggingLevel.WARN, 'Seat_information consuming unrecognized property: '+text);
                            consumeObject(parser);
                        }
                    }
                }
            }
        }
    }
    
    
    public static SeatInformationWrapper parse(String json) {
        System.JSONParser parser = System.JSON.createParser(json);
        return new SeatInformationWrapper(parser);
    }
    
    public static void consumeObject(System.JSONParser parser) {
        Integer depth = 0;
        do {
            System.JSONToken curr = parser.getCurrentToken();
            if (curr == System.JSONToken.START_OBJECT || 
                curr == System.JSONToken.START_ARRAY) {
                depth++;
            } else if (curr == System.JSONToken.END_OBJECT ||
                curr == System.JSONToken.END_ARRAY) {
                depth--;
            }
        } while (depth > 0 && parser.nextToken() != null);
    }
    




    private static List<Seat_information> arrayOfSeat_information(System.JSONParser p) {
        List<Seat_information> res = new List<Seat_information>();
        if (p.getCurrentToken() == null) p.nextToken();
        while (p.nextToken() != System.JSONToken.END_ARRAY) {
            res.add(new Seat_information(p));
        }
        return res;
    }



}