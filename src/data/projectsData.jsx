import {
  FiCpu, FiEye, FiBattery,
  FiSettings,
  FiClock, FiActivity,
} from "react-icons/fi";
import { FaParking, FaTrafficLight, FaMicrochip } from "react-icons/fa";

export const projectsData = [
  {
    id: 1,
    icon: FaParking,
    name: "IoT Smart Parking",
    desc: "An IoT-driven smart parking infrastructure for urban mobility optimization using ESP32, IR sensors, Arduino, and a Flutter mobile app with Firebase cloud integration.",
    tags: ["ESP32", "Arduino", "Flutter", "Firebase", "IoT", "IR Sensor"],
    abstract:
      "A Smart Parking Management System (SPMS) built on Arduino and ESP32-CAM with an Android mobile application based on IoT. The system enables users to check available parking spaces and reserve slots in real time. IR sensors detect vehicle presence, and slot data is transmitted via Wi-Fi to Firebase Realtime Database. The Flutter mobile app provides an interactive interface for booking, real-time availability monitoring, and digital payments — reducing urban congestion and improving the driver experience.",
    problem:
      "Urban drivers spend up to 30% of travel time searching for parking, leading to increased fuel consumption, air pollution, and traffic congestion. Traditional parking systems are inefficient, lacking real-time slot detection, digital booking, and mobile integration. Manual and ticket-based systems offer no live availability feedback to users.",
    solution:
      "A two-slot prototype equipped with IR sensors on each slot connected to an ESP32 microcontroller that transmits real-time occupancy data to Firebase Realtime Database. An Arduino UNO controls entry/exit gates via SG90 servo motors and traffic light indicators. A DS3231 RTC module records precise entry/exit timestamps for parking duration tracking. Users interact through a Flutter mobile app for slot booking, live availability, QR-based entry/exit, and cashless payment — all powered by 18650 Li-ion batteries through an LM2596 buck converter for portable operation.",
    flowNodes: [
      { title: "IR Sensor", sub: "Vehicle Detection" },
      { title: "ESP32", sub: "Wi-Fi + Processing" },
      { title: "Firebase", sub: "Realtime DB" },
      { title: "Flutter App", sub: "Booking & Payment" },
      { title: "Arduino UNO", sub: "Gate & Traffic Light" },
    ],
    components: [
      { icon: FiCpu, name: "ESP32 + CAM-MB", spec: "Dual-core 240MHz, Wi-Fi" },
      { icon: FaMicrochip, name: "Arduino UNO", spec: "ATmega328P, Gate Control" },
      { icon: FiEye, name: "IR Sensor", spec: "2-30cm, Digital Output" },
      { icon: FiSettings, name: "SG90 Servo", spec: "Entry/Exit Gate Motor" },
      { icon: FaTrafficLight, name: "Traffic Light", spec: "R/Y/G Slot Indicator" },
      { icon: FiClock, name: "DS3231 RTC", spec: "I2C, +/-2ppm Accuracy" },
      { icon: FiBattery, name: "18650 Li-Ion", spec: "3.7V, 2200-3500mAh" },
      { icon: FiActivity, name: "LM2596 Buck", spec: "DC-DC Step-Down 3.3V/5V" },
    ],
    optimizations: [
      "IR sensor with <1ms response time for accurate real-time vehicle detection",
      "ESP32 Wi-Fi cloud sync with stable connectivity within 20m range",
      "DS3231 RTC for precise entry/exit timestamps — enables automated duration billing",
      "QR-based vehicle verification at entry/exit for secure access control",
      "Portable battery-powered design using 18650 cells + LM2596 buck converter",
      "98% sensor detection accuracy with 1.5s average response time in testing",
      "Scalable architecture — easily expandable from 2 slots to larger deployments",
    ],
    references: [
      "MYI Idris et al., \"Car park system: A review of smart parking system and its technology\" — Information Technology, 2009, academia.edu",
      "A. Khanna, R. Anand, \"IoT based smart parking system\" — IEEE Conference on Internet of Things, 2016, ieeexplore.ieee.org",
      "A. Fahim, M. Hasan, MA Chowdhury, \"Smart parking systems: comprehensive review\" — Heliyon, 2021, cell.com",
      "Harkiran Kaur & Jyoteesh Malhotra, \"A Review of Smart Parking System based on IoT\" (2018) — IJISAE",
      "Hardik Tanti et al., \"Smart Parking System based on IoT\" (2020) — IJERT",
      "Nazish Fatima et al., \"IOT Based Smart Car Parking System for Smart Cities\" (2018) — IJARIIT",
      "Ridhi Choudhary et al., \"An IoT-based Smart Parking System\" — Papers with Code",
      "Abhirup Khanna & Rishi Anand, \"IoT Based Smart Parking Using FASTag\" — IJCRT",
      "Gurushankar M et al., \"Smart Parking System\" — IARJSET",
    ],
    photos: [
      { src: "/images/smart-park/photo1.jpeg", label: "Hardware Prototype" },
      { src: "/images/smart-park/photo2.jpeg", label: "ESP32 & Sensor Wiring" },
      { src: "/images/smart-park/photo3.jpeg", label: "Post Lock Gate System" },
      { src: "/images/smart-park/photo4.jpeg", label: "Mobile App UI" },
    ],
  },
];
