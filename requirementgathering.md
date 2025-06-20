# Software Requirements Specification (SRS)
## Real-Time Chat/Messaging Application

**Document Version:** 1.0  
**Date:** June 3, 2025  
**Project:** Real-Time Chat Application  
**Technology Stack:** Angular + Spring Boot + MySQL

---

## Table of Contents

1. [Introduction](#introduction)
2. [Overall Description](#overall-description)
3. [System Features and Requirements](#system-features-and-requirements)
4. [External Interface Requirements](#external-interface-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [Other Requirements](#other-requirements)
7. [Appendices](#appendices)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for a **Real-Time Chat/Messaging Application**. The application will be developed using Angular for the frontend, Spring Boot for the backend, and MySQL for data persistence. This document serves as a blueprint for developers, testers, and stakeholders involved in the project.

### 1.2 Document Conventions

- **Functional Requirements** are denoted with FR-XX format
- **Non-Functional Requirements** are denoted with NFR-XX format
- **Priority levels:** High, Medium, Low
- **Bold text** indicates important technical terms
- `Code blocks` represent technical implementations

### 1.3 Intended Audience and Reading Suggestions

This document is intended for:

- **Developers:** Focus on Sections 3, 4, and 5 for implementation details
- **Project Managers:** Review Sections 1, 2, and 6 for scope and timeline planning
- **Testers:** Concentrate on Sections 3 and 5 for test case development
- **Stakeholders:** Review Sections 1, 2, and 5 for business alignment

### 1.4 Product Scope

The Real-Time Chat Application is an intermediate-level project designed to provide instant messaging capabilities between users. The system will support real-time bidirectional communication using **WebSocket technology**, user authentication, message persistence, and a modern responsive user interface. The application aims to demonstrate advanced concepts beyond basic CRUD operations while maintaining intermediate complexity suitable for learning purposes.

### 1.5 References

- IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications
- Spring Boot WebSocket Documentation
- Angular WebSocket Integration Guidelines
- MySQL Database Design Best Practices
- WebSocket RFC 6455 Standard

---

## 2. Overall Description

### 2.1 Product Perspective

The Real-Time Chat Application is a standalone web-based messaging system that operates independently of existing chat platforms. The system consists of three main components:

- **Frontend (Angular):** Single-page application providing user interface
- **Backend (Spring Boot):** RESTful API server with WebSocket support
- **Database (MySQL):** Relational database for data persistence

### 2.2 Product Functions

The major functions of the system include:

- User registration and authentication
- Real-time messaging between users
- Chat room management (public and private)
- Message history and persistence
- User presence tracking
- Typing indicators
- Message delivery status
- Basic file sharing capabilities

### 2.3 User Characteristics

**Primary Users:** Intermediate-level developers and technology enthusiasts

- **Technical Expertise:** Basic to intermediate understanding of web technologies
- **Age Range:** 18-45 years
- **Usage Pattern:** Demonstration, learning, and testing purposes
- **Device Preference:** Desktop browsers, mobile responsive

### 2.4 Constraints

- **Technology Stack:** Limited to Angular, Spring Boot, and MySQL
- **Deployment:** Single-server deployment for intermediate-level learning
- **Scalability:** Designed for moderate concurrent users (100-500)
- **Browser Support:** Modern browsers with WebSocket support
- **Network:** Requires stable internet connection for real-time features

### 2.5 Assumptions and Dependencies

**Assumptions:**
- Users have modern browsers with JavaScript enabled
- Stable network connectivity for real-time features
- Basic understanding of chat application concepts

**Dependencies:**
- Angular Framework (v15+)
- Spring Boot Framework (v2.7+)
- MySQL Database (v8.0+)
- Node.js and npm for frontend development
- Java 11+ for backend development

---

## 3. System Features and Requirements

### 3.1 User Management

#### 3.1.1 User Registration
- **FR-01:** The system shall allow new users to register with username, email, and password
- **Priority:** High
- **Details:** Users must provide unique username and email address. Password must meet security criteria.

#### 3.1.2 User Authentication
- **FR-02:** The system shall authenticate users using username/email and password
- **Priority:** High
- **Details:** Implement JWT-based authentication with secure token management.

#### 3.1.3 User Profile Management
- **FR-03:** The system shall allow users to update their profile information
- **Priority:** Medium
- **Details:** Users can modify display name, email, and profile picture.

### 3.2 Real-Time Messaging

#### 3.2.1 Send Messages
- **FR-04:** The system shall allow authenticated users to send text messages
- **Priority:** High
- **Details:** Messages must be delivered in real-time using WebSocket/STOMP protocol.

#### 3.2.2 Receive Messages
- **FR-05:** The system shall deliver messages to intended recipients in real-time
- **Priority:** High
- **Details:** Implement publish-subscribe pattern for message distribution.

#### 3.2.3 Message History
- **FR-06:** The system shall persist and display message history
- **Priority:** High
- **Details:** Store messages in MySQL database with timestamp and retrieval capabilities.

#### 3.2.4 Typing Indicators
- **FR-07:** The system shall display typing indicators when users are composing messages
- **Priority:** Medium
- **Details:** Real-time indication via WebSocket without message persistence.

### 3.3 Chat Room Management

#### 3.3.1 Public Chat Room
- **FR-08:** The system shall provide a public chat room for all users
- **Priority:** High
- **Details:** Default chat room accessible to all authenticated users.

#### 3.3.2 Private Messaging
- **FR-09:** The system shall support one-on-one private messaging
- **Priority:** High
- **Details:** Direct messaging between two users with privacy controls.

#### 3.3.3 User Presence
- **FR-10:** The system shall display online/offline status of users
- **Priority:** Medium
- **Details:** Real-time user presence tracking via WebSocket connections.

### 3.4 Message Features

#### 3.4.1 Message Status
- **FR-11:** The system shall provide message delivery status (sent, delivered)
- **Priority:** Medium
- **Details:** Visual indicators for message status in the user interface.

#### 3.4.2 Message Timestamps
- **FR-12:** The system shall timestamp all messages
- **Priority:** High
- **Details:** Display message creation time in user-friendly format.

#### 3.4.3 Basic File Sharing
- **FR-13:** The system shall support basic image file sharing
- **Priority:** Low
- **Details:** Allow users to share image files with size limitations.

---

## 4. External Interface Requirements

### 4.1 User Interface Requirements

#### 4.1.1 Web Interface
- **Technology:** Angular-based single-page application
- **Responsiveness:** Mobile-first responsive design
- **Accessibility:** WCAG 2.1 AA compliance
- **Browser Support:** Chrome, Firefox, Safari, Edge (latest versions)

#### 4.1.2 Key UI Components
- Login/Registration forms
- Chat message display area
- Message composition interface
- User list sidebar
- Chat room selection
- Settings panel

### 4.2 Hardware Interface Requirements

#### 4.2.1 Client-Side Requirements
- **Device:** Desktop computers, tablets, smartphones
- **Memory:** Minimum 2GB RAM
- **Storage:** 100MB available space for browser cache
- **Network:** Broadband internet connection

#### 4.2.2 Server-Side Requirements
- **CPU:** Multi-core processor (4+ cores recommended)
- **Memory:** Minimum 8GB RAM
- **Storage:** 100GB available disk space
- **Network:** High-speed internet connection

### 4.3 Software Interface Requirements

#### 4.3.1 Frontend Dependencies
- **Angular Framework:** v15+
- **Angular Material:** UI component library
- **SockJS-client:** WebSocket messaging client
- **SockJS:** WebSocket fallback library

#### 4.3.2 Backend Dependencies
- **Spring Boot:** v2.7+
- **Spring WebSocket:** Real-time messaging support
- **Spring Security:** Authentication and authorization
- **Spring Data JPA:** Database operations

#### 4.3.3 Database Interface
- **MySQL:** v8.0+
- **Connection Pool:** HikariCP for connection management
- **Migration:** Flyway for database schema management

### 4.4 Communication Interface Requirements

#### 4.4.1 WebSocket Protocol
- **Protocol:** WebSocket over HTTP/HTTPS
- **Messaging:** STOMP (Simple Text Oriented Messaging Protocol)
- **Fallback:** SockJS for browser compatibility

#### 4.4.2 REST API
- **Protocol:** HTTP/HTTPS
- **Format:** JSON for data exchange
- **Authentication:** JWT tokens

---

## 5. Non-Functional Requirements

### 5.1 Performance Requirements

#### 5.1.1 Response Time
- **NFR-01:** Message delivery latency shall not exceed 200ms under normal conditions
- **Priority:** High
- **Measurement:** Average round-trip time for message delivery

#### 5.1.2 Throughput
- **NFR-02:** System shall handle 100 concurrent WebSocket connections
- **Priority:** High
- **Measurement:** Number of simultaneous active connections

#### 5.1.3 Database Performance
- **NFR-03:** Database queries shall execute within 500ms
- **Priority:** Medium
- **Measurement:** Query execution time for message retrieval

### 5.2 Scalability Requirements

#### 5.2.1 User Scalability
- **NFR-04:** System shall support up to 500 registered users
- **Priority:** Medium
- **Measurement:** Total user accounts in database

#### 5.2.2 Message Volume
- **NFR-05:** System shall handle 10,000 messages per day
- **Priority:** Medium
- **Measurement:** Daily message processing capacity

### 5.3 Reliability Requirements

#### 5.3.1 Availability
- **NFR-06:** System shall maintain 99% uptime during operational hours
- **Priority:** High
- **Measurement:** System availability percentage

#### 5.3.2 Error Handling
- **NFR-07:** System shall gracefully handle WebSocket disconnections
- **Priority:** High
- **Measurement:** Automatic reconnection success rate

### 5.4 Security Requirements

#### 5.4.1 Authentication Security
- **NFR-08:** User passwords shall be encrypted using bcrypt hashing
- **Priority:** High
- **Implementation:** Spring Security password encoding

#### 5.4.2 Data Transmission Security
- **NFR-09:** All WebSocket communications shall use secure protocols (WSS)
- **Priority:** High
- **Implementation:** TLS encryption for WebSocket connections

#### 5.4.3 Input Validation
- **NFR-10:** All user inputs shall be validated and sanitized
- **Priority:** High
- **Implementation:** Server-side validation and XSS prevention

### 5.5 Usability Requirements

#### 5.5.1 User Interface
- **NFR-11:** User interface shall be intuitive and require minimal training
- **Priority:** Medium
- **Measurement:** Task completion time for new users

#### 5.5.2 Response Feedback
- **NFR-12:** System shall provide immediate feedback for user actions
- **Priority:** Medium
- **Implementation:** Loading indicators and status messages

### 5.6 Compatibility Requirements

#### 5.6.1 Browser Compatibility
- **NFR-13:** Application shall work on major browsers (Chrome, Firefox, Safari, Edge)
- **Priority:** High
- **Testing:** Cross-browser compatibility testing

#### 5.6.2 Device Compatibility
- **NFR-14:** Application shall be responsive across desktop and mobile devices
- **Priority:** Medium
- **Implementation:** Bootstrap or Angular Material responsive design

### 5.7 Maintainability Requirements

#### 5.7.1 Code Quality
- **NFR-15:** Code shall follow established coding standards and best practices
- **Priority:** Medium
- **Measurement:** Code review and static analysis tools

#### 5.7.2 Documentation
- **NFR-16:** All API endpoints shall be documented
- **Priority:** Medium
- **Implementation:** Swagger/OpenAPI documentation

---

## 6. Other Requirements

### 6.1 Legal and Compliance Requirements

#### 6.1.1 Data Privacy
- Comply with basic data protection principles
- Implement user consent for data collection
- Provide data deletion capabilities

#### 6.1.2 Terms of Service
- Clear usage guidelines and restrictions
- User behavior policies for chat communication

### 6.2 Internationalization Requirements

#### 6.2.1 Language Support
- **Primary language:** English
- **UTF-8** character encoding support
- Future extensibility for multiple languages

### 6.3 Installation and Deployment Requirements

#### 6.3.1 Development Environment
- Docker containerization for easy setup
- Environment-specific configuration files
- Database migration scripts

#### 6.3.2 Production Deployment
- Single-server deployment configuration
- Environment variable management
- Logging and monitoring setup

---

## 7. Appendices

### 7.1 Glossary

| Term | Definition |
|------|------------|
| **STOMP** | Simple Text Oriented Messaging Protocol |
| **WebSocket** | Full-duplex communication protocol |
| **JWT** | JSON Web Token for authentication |
| **SockJS** | WebSocket-like object with fallbacks |
| **Real-time** | Immediate data processing and response |

### 7.2 Database Schema Overview

#### 7.2.1 Core Tables
- **users:** User account information
- **chat_rooms:** Chat room definitions
- **messages:** Message content and metadata
- **user_sessions:** Active user sessions
- **room_participants:** User-room relationships

### 7.3 API Endpoints Summary

#### 7.3.1 REST Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/messages/{roomId}` - Message history
- `GET /api/users/online` - Online users list

#### 7.3.2 WebSocket Endpoints
- `/ws` - WebSocket connection endpoint
- `/app/chat.sendMessage` - Send message
- `/topic/public` - Public chat subscription
- `/user/{username}/private` - Private message subscription

### 7.4 Technology Stack Details

#### 7.4.1 Frontend Technology Stack
- **Angular:** v15+ (TypeScript framework)
- **Angular Material:** UI component library
- **RxJS:** Reactive programming library
- **SockJS-client:** WebSocket messaging client

#### 7.4.2 Backend Technology Stack
- **Spring Boot:** v2.7+ (Java framework)
- **Spring WebSocket:** Real-time communication
- **Spring Security:** Security framework
- **Spring Data JPA:** Data access layer

#### 7.4.3 Database Technology
- **MySQL:** v8.0+ (Relational database)
- **Flyway:** Database migration tool
- **HikariCP:** Connection pooling

---

## Document Control

- **Created By:** Development Team
- **Review Status:** Draft
- **Approved By:** [To be assigned]
- **Next Review Date:** [To be scheduled]

---

*This document serves as the comprehensive requirements specification for the Real-Time Chat/Messaging Application project using Angular, Spring Boot, and MySQL technology stack.*
