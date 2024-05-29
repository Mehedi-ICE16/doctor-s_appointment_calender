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
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<string>("");
  
    useEffect(() => {
      dispatch(fetchAppointments() as any);
    }, [dispatch]);
  
    const appointments = useSelector((state: any) => state.getAppointments.appointments as Appointment[]);
    let content: any = appointments?.map((item: any) => {
        if (new Date(item.date).getFullYear() == parseInt(year) && new Date(item.date).getMonth() == parseInt(month)) {
          console.log(item);
          return { day: new Date(item.date).getDate(), node: <Box bg="#FFFFFF" style={{color: "black"}} p="10px" m="10px" rounded="full">Name: {item.name}<br/> Date: {item?.date?.toLocaleDateString('en-US')} <br/> Time: {item.time.toLocaleTimeString('en-US')}</Box> };
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
    };
  
    const getCurrentDateTime = (): string => {
      const now = new Date();
      return now.toISOString().slice(0, 16);
    };
  
    return (
      <>
        <HStack spacing="20dvw" mb="2dvh">
          <Select placeholder="Select year" style={{ cursor: 'pointer' }} onChange={(e) => setYear(e.target.value)}>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
  
          <Select placeholder="Select month" style={{ cursor: 'pointer' }} onChange={(e) => setMonth(e.target.value)}>
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
                  <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
                  <Button variant="ghost" onClick={onClose} type="submit">Submit</Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
  
        <Grid templateColumns="repeat(6, 1fr)" h="200px" templateRows="repeat(5, 1fr)" gap={1}>
          {Array.from({ length: 30 }, (_, day) => (
            <GridItem key={day} w="15dvw" h="17dvh" bg="#2C7A7B" style={{color: 'white'}} p="10px">
              {day + 1}
              <Box maxHeight= '90%'
                   overflowY={content?.filter((item : any) => item && item.day === day + 1).length > 3 ? 'scroll' : 'visible'}>
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
  