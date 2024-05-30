import {
    RadioGroup,
    Radio,
    HStack,
    FormLabel,
    Input,
    Grid,
    GridItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
    Button,
    Box,
  } from "@chakra-ui/react";
  import { useDispatch, useSelector } from "react-redux";
  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { addAppointment } from "../features/createAppointment";
  import { fetchAppointments } from "../features/getAppointments";
  
  interface Appointment {
    name: string;
    gender: string;
    age: number;
    date: string;
    time: string;
  }
  
  export const Calender = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formData, setFormData] = useState({
      name: "",
      gender: "",
      age: 0,
      date: "",
      time: "",
    });
    const dispatch = useDispatch();
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [dayNumber,setDayNumber] = useState<number>();
    const [rowNumber, setRowNumber] = useState<number>();

    useEffect(()=> {
      if(month%2 == 0) setDayNumber(31);
      else setDayNumber(30);
    },[month]);

    useEffect(()=> {
      if(dayNumber === 31) setRowNumber(6);
      else setRowNumber(5);
    },[rowNumber]);
  
    useEffect(() => {
      dispatch(fetchAppointments() as any);
    }, [dispatch]);

    const navigate = useNavigate();

   const  appointmentDetails = (id: string) => {
      navigate(`/appointment-details/${id}`);
    }
  
    const appointments = useSelector((state: any) => state.getAppointments.appointments as Appointment[]);
    let content: any = appointments?.map((item: any) => {
        if (new Date(item.date).getFullYear() == year && new Date(item.date).getMonth() == month) {
          console.log(item);
          return { day: new Date(item.date).getDate(), node: <Box onClick = { () => appointmentDetails(item.id)} bg="#FFFFFF" style={{color: "black"}} p="10px" m="10px" rounded="full">Name: {item.name} <br/> Time: {item.time}</Box> };
        }
        return null;
      }).filter(Boolean); 
    const uniqueYears = Array.from(new Set(appointments?.map((item: any) => new Date(item.date).getFullYear())));
    const uniqueMonths = Array.from(new Set(appointments?.map((item: any) => new Date(item.date).getMonth())));
    console.log(uniqueMonths, uniqueYears);
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(addAppointment(formData) as any);
      dispatch(fetchAppointments() as any);
    };
  
    const getCurrentDateTime = (): string => {
      const now = new Date();
      return now.toISOString().slice(0, 16);
    };
  
    return (
      <>
        <HStack spacing="20dvw" mb="2dvh">
          <Select placeholder="Select year" value = {year} style={{ cursor: 'pointer' }} onChange={(e) => setYear(parseInt(e.target.value))}>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
  
          <Select placeholder="Select month" value = {month} style={{ cursor: 'pointer' }} onChange={(e) => setMonth(parseInt(e.target.value))}>
            {uniqueMonths.map((month) => (
              <option key={month} value={month}>{monthNames[month]}</option>
            ))}
          </Select>
          <Button onClick={onOpen} colorScheme="blue" style={{ minWidth: "fit-content" }}>
            Create Appointment
          </Button>
        </HStack>
  
        <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Appointment</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <Input type="text" name="name" placeholder="Enter patient name" className="form-data" onChange={handleInputChange} />
                <FormLabel>Gender</FormLabel>
                <RadioGroup defaultValue="Male" name="gender" className="form-data" onChange={(value: "Male" | "Female") => setFormData({ ...formData, gender: value })}>
                  <HStack spacing="24px">
                    <Radio value="Male">Male</Radio>
                    <Radio value="Female">Female</Radio>
                  </HStack>
                </RadioGroup>
                <Input type="number" name="age" placeholder="Enter age of patient" className="form-data" onChange={handleInputChange} />
                <FormLabel>Appointment date</FormLabel>
                <Input type="date" name="date" placeholder="Enter appointment date" className="form-data" min={getCurrentDateTime().split("T")[0]} onChange={handleInputChange} />
                <FormLabel>Appointment time</FormLabel>
                <Input type="time" name="time" className="form-data" min={getCurrentDateTime().split("T")[1]} onChange={handleInputChange} />
                <ModalFooter>
                  <Button variant="ghost" mr={3} onClick={onClose}>Close</Button>
                  <Button  colorScheme="blue" onClick={onClose} type="submit">Submit</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
  
        <Grid templateColumns="repeat(6, 1fr)" h="200px" templateRows="repeat(rowNumber, 1fr)" gap={1}>
          {Array.from({ length: dayNumber }, (_, day) => (
            <GridItem key={day} w="15dvw" h="17dvh" bg="#2C7A7B" style={{color: 'white'}} p="10px">
              {day + 1}
              <Box maxHeight= '90%'
                   overflowY={content?.filter((item : any) => item && item.day === day + 1).length > 1 ? 'scroll' : 'visible'}>
                {/* { content && (content?.map((item : any) => {
                  return item && item.day == day + 1 ? <Box key={item.id}>{item.node}</Box> : null;
                }))} */}
                {content?.filter((item:any) => item && item.day === day + 1).map((item:any,index:any) => (
              item && <Box key={item.id || `${item.day}-${index}`}>{item.node}</Box>
            ))}
              </Box>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  };
  