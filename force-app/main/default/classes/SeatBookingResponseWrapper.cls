public class SeatBookingResponseWrapper {

	public String requestType {get;set;} 
	public Object token {get;set;} 
	public Boolean success {get;set;} 
	public Object detailErrors {get;set;} 
	public Object_Z object_Z {get;set;} // in json: object
	public Integer status {get;set;} 
	public String statusText {get;set;} 

	public SeatBookingResponseWrapper(JSONParser parser) {
		while (parser.nextToken() != System.JSONToken.END_OBJECT) {
			if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
				String text = parser.getText();
				if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
					if (text == 'requestType') {
						requestType = parser.getText();
					} else if (text == 'token') {
						token = parser.readValueAs(Object.class);
					} else if (text == 'success') {
						success = parser.getBooleanValue();
					} else if (text == 'detailErrors') {
						detailErrors = parser.readValueAs(Object.class);
					} else if (text == 'object') {
						object_Z = new Object_Z(parser);
					} else if (text == 'status') {
						status = parser.getIntegerValue();
					} else if (text == 'statusText') {
						statusText = parser.getText();
					} else {
						System.debug(LoggingLevel.WARN, 'SeatBookingResponseWrapper consuming unrecognized property: '+text);
						consumeObject(parser);
					}
				}
			}
		}
	}
	
	public class Object_Z {
		public String bookingId {get;set;} 
		public String seatNumber {get;set;} 
		public String employeeId {get;set;} 
		public String bookedFrom {get;set;} 
		public String bookedTo {get;set;} 
		public String status {get;set;} 
		public Boolean isTimeElapsed {get;set;} 

		public Object_Z(JSONParser parser) {
			while (parser.nextToken() != System.JSONToken.END_OBJECT) {
				if (parser.getCurrentToken() == System.JSONToken.FIELD_NAME) {
					String text = parser.getText();
					if (parser.nextToken() != System.JSONToken.VALUE_NULL) {
						if (text == 'bookingId') {
							bookingId = parser.getText();
						} else if (text == 'seatNumber') {
							seatNumber = parser.getText();
						} else if (text == 'employeeId') {
							employeeId = parser.getText();
						} else if (text == 'bookedFrom') {
							bookedFrom = parser.getText();
						} else if (text == 'bookedTo') {
							bookedTo = parser.getText();
						} else if (text == 'status') {
							status = parser.getText();
						} else if (text == 'isTimeElapsed') {
							isTimeElapsed = parser.getBooleanValue();
						} else {
							System.debug(LoggingLevel.WARN, 'Object_Z consuming unrecognized property: '+text);
							consumeObject(parser);
						}
					}
				}
			}
		}
        public Seat_Information__c getObject(){
        List<Seat_Information__c> seatInfos = new List<Seat_Information__c> ();
        seatInfos = [select Id,Name,Status__c,Total_Times_Booked__C, Total_Times_Occupied__C from Seat_Information__c where Name=: this.seatNumber];
        Seat_Information__c seatInfo;
        if(seatInfos.size() == 0)
          seatInfo = new Seat_Information__c(Total_Times_Booked__c = 0,Total_Times_Occupied__C=0);
        else
          seatInfo = seatInfos[0];
         seatInfo.Name= this.seatNumber;
         seatInfo.Total_Times_Booked__c =seatInfo.Total_Times_Booked__c + 1;
         seatInfo.Total_Times_Occupied__C =seatInfo.Total_Times_Occupied__C + 1;
         seatInfo.Status__c =this.status;
        //seatInfo.Last_Booked_Date__c =this.lastBookedDate 
        //seatInfo.Seat_Speciality__c = this.speciality;
        //this.averageRating
        return seatInfo;
        }
	}
	
	
	public static SeatBookingResponseWrapper parse(String json) {
		System.JSONParser parser = System.JSON.createParser(json);
		return new SeatBookingResponseWrapper(parser);
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
    
    
	






}