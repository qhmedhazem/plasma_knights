type Message = {
  event: string;
  data: any;
};

type EventData = Message | string;

interface Event {
  event: string;
  data: EventData;
}

interface ResponseData {
  coordinates_tests: {
    count: number;
    data: string[];
  };
  lmn_tests: {
    count: number;
    data: string[];
  };
}
