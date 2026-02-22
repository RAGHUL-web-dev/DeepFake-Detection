## PAGES

    1) Landing
    2) Login / Register
    3) Dashboard
    4) Media Upload
    5) Processing (optional)
    6) Verification Report
    7) Provenance History
    8) Feedback / Report
    9) Admin Panel
    10) Moderator Panel
    11) Profile


## FEATURES

    1. Authentication & User Management Features
        1.1 User Registration
            Secure account creation for general users
            Email-based unique identity
            Encrypted password storage (bcrypt / argon2)

        1.2 User Login
            Secure login using email and password
            Session management using JWT / tokens

        1.3 Role-Based Access Control (RBAC)
            Roles supported:
            Admin
            Moderator
            General User
            Feature access dynamically controlled based on role

        1.4 User Profile Management
            View profile details
            Change password
            View personal verification history
            Account activity tracking

    2. Dashboard & Activity Overview Features
        2.1 User Dashboard
            Overview of:
            Total media files verified
            Authentic vs fake count
            Recent verification activity
            Quick navigation to upload and reports

        2.2 System Activity Tracking
            Logs of:
            Media uploads
            Verification actions
            Reports submitted
            Blockchain anchoring events

    3. Media Upload & Input Handling Features
        3.1 Media Upload
            Support for:
            Images (JPEG, PNG)
            Videos (MP4, AVI, MOV)
            Drag-and-drop and file selector support

        3.2 Media Preview
            Image preview before submission
            Video preview with basic playback

        3.3 Metadata Extraction
            Automatic extraction of:
            Resolution
            Duration (for video)
            FPS
            File size
            Format

        3.4 Secure Hash Generation
            SHA-256 hash generation for every uploaded file
            Hash used as the unique digital fingerprint

    4. AI-Based Deepfake Detection Features
        4.1 Image Deepfake Detection
            Face detection and cropping
            Pixel-level artifact analysis
            CNN / Transformer-based classification

        4.2 Video Deepfake Detection
            Frame-by-frame extraction
            Temporal consistency analysis
            CNN-LSTM / Vision Transformer models

        4.3 Audio Deepfake Detection (Planned / Extendable)
            Audio track extraction
            Voice spoofing and cloning detection
            Speaker embedding analysis (e.g., ECAPA-TDNN)

        4.4 Multimodal Analysis
            Combined video + audio verification
            Cross-modal inconsistency detection

    5. Detection Output & Explainability Features
        5.1 Final Verdict Generation
            Classification:
            Authentic
            Fake
            Uncertain / Modified

        5.2 Confidence Scoring
            Percentage-based confidence score
            Indicates model certainty

        5.3 Heatmap Visualization
            Visual highlighting of suspicious regions
            Overlay on image or video frames

        5.4 Frame-Level Analysis (Videos)
            Per-frame fake probability
            Temporal manipulation indicators

        5.5 Deepfake Method Identification
            Attempt to classify manipulation type:
            GAN-based
            FaceSwap
            DeepFaceLab
            Morphing techniques

    6. Verification Report Features (Core Value)
        6.1 Detailed Verification Report
            Media information
            Detection verdict
            Confidence score
            Heatmaps
            Predicted manipulation method

        6.2 Forensic-Grade Output
            Court-ready structured report
            Clear, non-ambiguous explanations

        6.3 Report Download
            Downloadable verification report (PDF / JSON)

    7. Blockchain-Based Provenance Tracking Features
        7.1 Provenance Record Creation
            Store the following on blockchain:
            Media hash
            Verification result
            Timestamp
            Source reference (optional)

        7.2 Immutable Ledger Storage
            Records stored on:
            Ethereum / Polygon / Hyperledger
            Tamper-proof and verifiable

        7.3 Blockchain Transaction Linking
            Transaction hash associated with each media file
            Public verifiability of records

        7.4 Integrity Verification
            Hash mismatch detection for modified files
            Immediate detection of tampering attempts

    8. Provenance History & Timeline Features
        8.1 Media Lineage Tracking
            Track media lifecycle:
            Original upload
            Modifications
            Verification events

        8.2 Provenance Visualization
            Timeline / graph view of media evolution
            Each stage linked to blockchain entry

        8.3 Historical Verification Records
            Multiple verification attempts per file
            Long-term authenticity tracking

    9. Browser Extension Features (Standalone Client)
        9.1 Real-Time Web Media Scanning
            Detect images and videos on active webpages
            Extract media URLs / blobs

        9.2 Instant Authenticity Verification
            Hash generation inside browser
            Query backend verification API

        9.3 Authenticity Indicators
            🟢 Authentic
            🟡 Modified / Uncertain
            🔴 Deepfake

        9.4 Lightweight Popup UI
            Shows:
            Verification result
            Confidence score
            Verification timestamp

        9.5 Deep Link to Web App
            Redirect to full verification report page
            View complete provenance history

    10. Reporting & Feedback Features
        10.1 User Reporting
            Report incorrect detection
            Report suspicious media

        10.2 Feedback Submission
            Description and justification
            Attach supporting evidence (optional)

        10.3 Human-in-the-Loop Learning
            Feedback used for:
            Model improvement
            Dataset refinement

    11. Moderator Features
        11.1 Report Review Panel
            View reported media
            Analyze detection outputs

        11.2 Decision Actions
            Confirm detection
            Override result (logged)
            Escalate to admin

        11.3 Audit Logging
            Every moderator action recorded immutably

    12. Admin Features
        12.1 User & Role Management
            Assign / revoke roles
            Disable malicious accounts

        12.2 Model Governance
            Manage detection model versions
            Activate / deactivate models

        12.3 System Monitoring
            API health
            Inference performance
            Blockchain network status

        12.4 Security & Audit Logs
            Full system activity logs
            Compliance and traceability

    13. Security Features (Cross-Cutting)
        Encrypted API communication (TLS)
        Secure authentication (JWT)
        Password hashing
        Input validation & rate limiting
        Secure file handling

    14. Scalability & Engineering Features
        Asynchronous processing (Celery + Redis)
        Microservice-ready architecture
        Dockerized deployment
        Cloud-ready inference services

    15. Future-Ready & Extendable Features
        IPFS integration for large media
        C2PA / CAI standard support
        Cross-platform verification APIs
        Mobile app integration
        Advanced explainable AI (XAI)




## How to Run Locally



## Dashboard

    ### sidebar
        1. Dashboard
        2. Results
        3. Knowledge Hub
        4. Provenance History
        5. Feedback / Report
        6. Profile
        7. Logout (bottom)

### Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python main.py

### Frontend
cd frontend
npm install
npm run dev

