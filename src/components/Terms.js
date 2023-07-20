import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(10),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const [open, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <div className="login-link-tyc" onClick={handleClickOpen}>
        Terms and Conditions
      </div>
      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDialog}
        >
          Terms and Conditions
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <h3 style={{margin: "60px auto"}}>
              <u style={{fontSize: "24px"}}>ACCEPTANCE OF TERMS OF USE</u>
            </h3>
            <div style={{ fontWeight: "600" }}>
              ACCEPTANCE OF TERMS OF USE PLEASE READ THESE TERMS AND CONDITIONS
              CAREFULLY. BY ACCESSING THIS WEBSITE YOU AGREE TO BE BOUND BY THE
              TERMS AND CONDITIONS BELOW. THE COMPANY RESERVES THE RIGHT TO
              ALTER, AMEND AND MODIFY THESE TERMS AND CONDITIONS AT ITS SOLE
              DISCRETION. ALL SUCH AMENDMENTS AND MODIFICATIONS WILL BE DULY
              NOTIFIED ON THIS WEBSITE. IF YOU ARE NOT AGREEABLE TO THE TERMS
              AND CONDITIONS WE REQUEST YOU NOT TO ACCESS THIS WEBSITE.
            </div>
            You expressly agree to be bound by this Agreement, irrespective of
            whether You are a registered member or a visitor, by using the
            information, tools, features and functionality located on this
            Website. As such, You agree to be bound by the terms and conditions
            detailed herein. The Company recommends that, irrespective of
            whether You are a Visitor or a Registered Member who proposes to
            utilize the Service provided by the Company, to carefully read all
            the terms and conditions as provided herein. The said terms and
            conditions displayed are recommended to be saved for any future
            reference and for Your own records. In the event that You are
            representing certain individual/s, company/ies, third parties or any
            entities, in any capacity, then, You expressly confirm that You have
            the valid authority and the right to do so for and on behalf of
            them. By entering into this Agreement, You state that You have the
            right to bind such individual/s, company/ies, third parties or any
            entities to this Agreement. The Services made available on or
            through this Website has been made available to You for the specific
            purpose of enabling Users to purchase original merchandise such as
            eyewear (which includes both spectacles and contact lens) , watches
            and bags from various high end brands (collectively, "Products"). It
            is not intended to be providing You with any nature of
            certification, guarantee or warranty or any professional advice and
            is a mere information and guidance. By accessing, browsing and using
            this Website/s, You agree and acknowledge that You understand this
            limited and restricted use, and agree that You will not rely on the
            information and materials contained in this Website for any purposes
            except as is intended. You further agree that in all actual matters,
            You are ultimately responsible for determining Your specific
            requirements. You are strictly prohibited from unauthorized use of
            our systems or this Website/s, including but not limited to
            unauthorized entry into our systems, misuse of passwords, or misuse
            of any information posted to this Website. You acknowledge that the
            Company may disclose and transfer any information that You provide
            through this Website to <br /> (i) our affiliate or information
            providers,
            <br /> (ii) to any third party but strictly with Your permission, or{" "}
            <br /> (iii) if we are legally bound to disclose any information due
            to compulsions under law. You consent to the transmission, transfer
            or processing of such information to, or through, any country in the
            world, as we deem necessary or appropriate, and by using and
            providing information through this Website You agree to such
            transfers. You expressly agree and acknowledge that usage of the
            Website/s may be monitored, tracked and recorded. As such, you
            expressly consent to such monitoring, tracking and recording. You
            are responsible for being familiar with the current version of these
            Terms and Conditions posted on the Website during each session. By
            the continued accessing of this Website or the Services, you
            implicitly agree to be bound by the revised terms and conditions.
            Any such revisions will be duly posted on this Website and the
            Company may, if it chooses, send you an e-mail in this regard.
            SERVICE AND PRODUCTS The Company provides an opportunity for You to
            purchase the Products from manufacturers and retailers. Upon placing
            order, the Company shall ship the Product to You and will be
            entitled to its payment for the Services. All Products and
            information displayed on the Website/s constitute an "invitation to
            offer". Your order for purchase constitutes your "offer" which shall
            be subject to the terms and conditions as detailed in this
            Agreement. The Company may accept or reject Your offer in its sole
            discretion which cannot be contested by You. The Company, to the
            best of its knowledge, has displayed or attempts to display on the
            Website/s as accurately as is possible, colours of the Products that
            is displayed on the Website/s. However, the colours visible to You
            is solely dependent on Your monitor. Hence, no guarantee is provided
            by the Company regarding Your visibility of the colours on the
            Website/s. The Company does not provide any warranty or guarantee
            that the Product descriptions are accurate, complete, reliable,
            current, or error-free. YOUR OBLIGATION AND COVENATS TOWARDS THE
            PRODUCTS In addition to Your other covenants in this Agreement, by
            ordering Product/s on the Website/s You acknowledge and agree that:
            <br /> (a) That any non-delivery or wrong delivery of the Products
            by the Company due to error in the information provided by You,
            then, any re-delivery cost in addition to the initial cost will be
            billed to You; <br /> (b) All information provided by You including
            your contact details, name and address, bank or credit card details
            are Yours and authentic and there is no misrepresentation or
            fraudulent act from Your end; <br /> (c) That before placing an
            order You will check the Product description carefully. By placing
            an order for a Product You agree to be bound by the conditions of
            sale included in the item's description. INFORMATION REQUIRED FROM
            YOU Upon your acceptance of agreeing to be a member and avail
            services from our Website/s, we would request you certain basic
            information for registration. Once you provide us with the details,
            we would request you for additional information in order to provide
            You with the services. However, we will not request you for any
            personal information or identity disclosure. All information
            provided form You will be treated as private and confidential. The
            same is more fully detailed under clause in Privacy Policy and
            Security . ORDER FOR AND SUPPLY OF PRODUCTS <br /> (a) You will have
            to submit Your Order for the purchase of the Product as detailed
            under the Website/s. <br /> (b) Once the order is submitted it an
            express intention to purchase the Product and the same may not be
            cancelled except as provided hereunder. <br /> (c) Based on the
            information provided by You and subject to the Company’s
            verification of the same, the Orders will be accepted by the Company
            for processing. <br /> (d) All orders will be processed once the
            Company receives the payment for the Product. <br /> (e) All orders
            will be confirmed via e-mail. <br /> (f) The Company will use its
            best efforts to ensure that order placed by You is successfully
            processed subject to the availability of the Product/s. In the event
            the Product/s is sold out or unavailable, the Company will intimate
            You regarding the same and either refund Your money or provide you
            with an opportunity to purchase a different Product of the same
            value. PRICING AND PAYMENT <br /> (a) The prices for Product/s are
            described on the Website/s and are incorporated into these terms by
            reference. All prices are in Indian rupees. The prices, products and
            services are subject to change at the Company’s discretion. <br />{" "}
            (b) All prices are exclusive of any tax that may be required to be
            remitted to tax authorities. <br /> (c) The Company does not make
            any representation that the prices quoted on the Website/s will{" "}
            <br /> (d) You agree, understand, confirm and state that the card
            details provided by You to transact on the Website will be correct,
            accurate and is owned by You. In the event You use the card
            belonging to any third party, then, you confirm that you have been
            authorized to or expressly permitted by such third party to use the
            card for making payments. <br /> (e) The Company will not be liable
            for any credit card fraud. The liability for use of a card
            fraudulently will be on the User and the onus to 'prove otherwise'
            shall be exclusively on the User. DELIVERY AND CANCELLATION <br />{" "}
            (a) The Company expressly disclaims any guarantee of exactness as to
            the finish and appearance of the final Product/s as ordered by You
            based on the display on the Website/s. The quality of any Product/s,
            Services, information, or other material purchased or obtained by
            You through the Website/s may not meet your expectations. There may
            be an alteration with respect to you Order. This will be intimated
            to you by the Company. <br /> (b) Title and risk of loss for all
            Product/s ordered by You shall pass on to You upon the Company’s
            shipment to the shipping carrier. <br /> (c) The Company will make
            the delivery on a ‘best effort’ basis after acceptance of Your
            order. The Company will ship the Product/s to the mailing address
            provided by You while placing the order. If you do not receive the
            Product/s within a reasonable period of time, You should immediately
            notify the Company. <br /> (d) You have an obligation to forthwith
            check the Product/s for accuracy upon receipt of the same. <br />{" "}
            (e) The Company reserves the right to cancel an order in case the
            order request is not acceptable to the Company. Upon such
            cancellation, the Company will refund the money to You. Any such
            cancellation shall be at the sole discretion of the Company and You
            will have no right to contest the same. The reasons for cancellation
            could be due to non-availability of the Product/s, in accuracy in
            Product or pricing information or due to reasons of any fraud or
            wrong usage of payment mechanism adopted by You. Any cancellation
            will be intimated to You by the Company. <br /> (f) In the event You
            desire to cancel any order, then, such cancellation must be done
            prior to the ’s dispatch of the Product/s to you. Once dispatched,
            the Company will not accept any cancellation request from Your end.
            LINKS TO THIRD PARTY SITES As part of availing the Services, You as
            a member will provide us Your personal information either to
            retrieve or collect data or information from third party websites.
            Such third party websites may be maintained by such financial
            institutions with whom You have an account, bank with or have
            created certain liabilities. The Company does not and cannot assume
            any responsibility or accuracy for such information or data
            maintained by such third party either in terms of updation,
            accuracy, deletion, non-delivery or failure to store data,
            communications, etc. The Website may provide, or third parties may
            provide, or the Website may contain links to other World Wide Web
            sites or resources. The responsibility for the operation and content
            of those websites shall rest solely with the organization identified
            as controlling the third party website and will be governed by
            separate terms and conditions. Links are provided for convenience
            and inclusion of any link does not imply endorsement in any way of
            the site to which it links. Because the Company has no control over
            such sites and resources, You acknowledge and agree that the Company
            is not responsible for the availability of such external sites or
            resources, and does not endorse and is not responsible or liable for
            any content, advertising, products, or other materials on or
            available from such sites or resources. You further acknowledge and
            agree that the Company shall not be responsible or liable, directly
            or indirectly, for any damage or loss caused or alleged to be caused
            by or in connection with use of or reliance on any such content,
            goods or services available on or through any such site or resource.
            REGISTRATION AND USE You agree and understand that You are
            responsible for maintaining the confidentiality of all information
            provided to the Company while registering Yourself, which includes
            Your login ID, e-mail address and the passwords for the same. You
            are fully responsible for all activities that occur under Your e
            mail address password or account and You shall ensure that You exit
            from Your account at the end of each session. The Company will send
            all correspondences, notices and any other communication to the
            e-mail address furnished by You. In case of any change in the said
            e-mail address, it is Your duty to update or change the same. The
            Company shall maintain utmost secrecy and use all the security
            measures to ensure that the information is not misused by any third
            party. Further, You agree and understand that Your right to access
            and use the Services offered on this Website is personal to You and
            is not transferable by You to any other person or entity. You
            understand that You are authorized to access and use the services
            only for legal and lawful purposes. You further undertake and state
            that by using the services You are in no way impersonating or
            misrepresenting any person or entity. All services availed are for
            Yourself only. In the event You are representing individual/s,
            company/ies, third parties or any entities, You undertake and state
            that You are authorized to represent such individual/s, company/ies,
            third parties or any entities. You shall be solely responsible for
            the consequences arising out of such acts and the Company shall not
            be held responsible or liable in anyway to any person or entity. Any
            changes in Your registration information must be duly updated by
            You. STORAGE, DELETION OR TRANSPORT OF DATA The Company states that
            the data provided by You shall belong solely and exclusively to You.
            As such, You are permitted to remove or delete the data, so
            provided, either in full or any portion, at any point in time as You
            desire. The Company requests You to notify the Company of such
            removal or deletion. In the event, You desire the Company to remove
            or delete all or any portion of the data belonging to You, then, the
            same needs to be provided in writing to the Company. Upon receipt of
            such written request, the Company will do the needful forthwith and
            notify You of the same. The Company will not retain any copies of
            such data on its server or in any other place. In this regard, the
            Company warrants that it cannot access such deleted material at any
            point in time. Any contact, information or access that the Company
            had towards such data or material or accounts will cease forthwith.
            However, certain portions of Your data, which the Company had
            maintained on its servers may remain either in backups or in
            transaction logs. These are maintained only for the specific purpose
            of backup or to provide Services to You in the event of any
            malfunction or damage to our server in order to ensure continuity of
            our service without disruption. RIGHTS GRANTED BY YOU As the
            provision of Services includes You providing us with information,
            data, passwords, usernames, personal identification numbers and
            other materials and contents, suggestions, ideas, feedback, etc.,
            You are hereby expressly granting us the license and right to
            utilize the same for and on Your behalf in order to provide the
            Services. The Company may or will use such information with the sole
            purpose for providing You the required Services and not for any
            other purpose. As such, You hereby warrant and represent that You
            are duly authorized to submit or represent the third party on behalf
            of whom You are providing these information to the Company. Further,
            You acknowledge and agree that these materials, suggestions,
            feedback and information can be utilized without any obligation or
            restriction on the Company in terms of payment of fee or any other
            limitations for marketing, promoting, advertising or other purposes.
            By using the Service, You expressly authorize the Company to access
            Your accounts maintained by identified third parties, on Your behalf
            as Your agent. When You use the specified feature of another
            additional account of the Service, You will be directly connected to
            the website for the third party You have identified. The Company
            will submit information including usernames and passwords that You
            provide to log you into the site. You hereby authorize and permit
            the Company to use information submitted by You to the Service{" "}
            <br /> (such as account passwords and users names) to accomplish the
            foregoing and to configure the Service so that it is compatible with
            the third party sites for which You submit Your information. YOUR
            POSTINGS ON WEBSITE We, as part of our Service, encourage and permit
            You to post Your messages or content on any publicly available
            forums, blogs and other locations on the Website. By using or
            posting messages or data or any other information on such forums,
            blogs and other public locations, You expressly agree that You and
            only You, are responsible for all the matters contained in such
            content. You further, represent and warrant to us that You have all
            the necessary rights to post such messages or information or content
            and grant us a perpetual, worldwide, royalty free, non-exclusive,
            transferable and sub licensable right to use, reproduce, distribute,
            display, modify, amend, perform, etc of such content or information
            to promote, modify or redistribute this Website, including
            preparation of any derivative works thereof, in any form and through
            any medium without any restrictions thereof. You expressly agree
            that all the rights granted under this paragraph will also be
            available to each and every user of this Website. Further, if You
            intend to use a forum, a blog or any other feature available on this
            Website, then, You should make an independent and informed choice
            about submitting Your personal identifiable information. All
            personally identifiable information submitting on such forums, blogs
            or community features can be read, collected or used by any third
            party. There is a danger of such information being misused or
            misappropriated. We do not have control over such actions and we are
            not responsible or liable for the personally identifiable
            information that You as a user have chosen to submit on a public
            platform. In case of any violation of this condition, then, the
            Company reserves the right to forthwith stop your participation on
            such public forums. PROHIBITED ACTIVITIES You agree NOT to do to the
            following: <br /> (a) upload, post, email, transmit or otherwise
            make available any content that is unlawful, harmful, threatening,
            abusive, harassing, tortuous, defamatory, vulgar, obscene, libelous,
            invasive of another's privacy, hateful, or racially, ethnically or
            otherwise objectionable; <br /> (b) impersonate any person or
            entity, including, but not limited to, officials, directors,
            employees, agents, authorized representatives, forum leaders, guides
            or hosts, or falsely state or otherwise misrepresent any information
            or accounts; <br /> (c) forge headers or otherwise manipulate
            identifiers in order to disguise the origin of any content or
            material transmitted or provided through the Site; <br /> (d)
            Collect or store personal data about other users; <br /> (e)
            Interfere with or disrupt the Website or servers or networks
            connected to the Website, or disobey any requirements, procedures,
            policies or regulations of networks connected to the Website; <br />{" "}
            (f) Intentionally or unintentionally violate any applicable local,
            state, national or international law; <br /> (g) Upload, post,
            email, transmit or otherwise make available any material that
            contains software viruses or any other computer code, files or
            programs designed to interrupt, destroy or limit the functionality
            of any computer software or hardware or telecommunications
            equipment; <br /> (h) Upload, post, email, transmit or otherwise
            make available any unsolicited or unauthorized advertising,
            promotional materials, "junk mail," "spam," "chain letters,"
            "pyramid schemes," or any other form of solicitation, except in
            those specific areas that may be designated for such purpose of
            posting such mails or messages by the Company; <br /> (i) Use any
            robot, spider, scraper, deep link or other similar automated data
            gathering or extraction tools, program, algorithm or methodology to
            access, acquire, copy or monitor this Website, either in whole or
            part; <br /> (j) Use or attempt to use any engine, software, tool,
            agent, or other device or mechanism <br /> (including without
            limitation browsers, spiders, robots, avatars or intelligent agents)
            to navigate or search this Website, other than the search engines
            and search agents available through the Service and other than
            generally available third-party web browsers <br /> (such as
            Microsoft Explorer); <br /> (k) Attempt to decipher, decompile,
            disassemble, or reverse-engineer any of the software comprising or
            in any way making up a part of this Website or the Service. <br />{" "}
            (l) post or transmit any message, data, image or program that would
            violate the property rights of others, including unauthorized
            copyrighted text, images or programs, trade secrets or other
            confidential proprietary information, and trademarks or service
            marks used in an infringing fashion. <br /> (m) You may not
            interfere with other Users’ use of the Service, including, without
            limitation, disrupting the normal flow of dialogue in an interactive
            area of this Website, deleting or revising any content posted by
            another person or entity, or taking any action that imposes a
            disproportionate burden on the Service infrastructure or that
            negatively affects the availability of the Service to others. You
            agree that any employment or other relationship You form or attempt
            to form with an employer, employee, or contractor whom You contact
            through areas of this Website that may be designated for that
            purpose is between You and that employer, employee, or contractor
            alone, and not with us. DISCLAIMER THE CONTENT AND ALL SERVICES
            ASSOCIATED WITH THIS WEBSITE OR PROVIDED THROUGH THE SERVICE ARE
            PROVIDED TO YOU ON AN “AS-IS” AND “AS AVAILABLE” BASIS. THE COMPANY
            MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR
            IMPLIED, AS TO THE CONTENT OR OPERATION OF THIS WEBSITE OR OF THE
            SERVICE. YOU EXPRESSLY AGREE THAT YOUR USE OF THE SERVICE AND
            PURCHASE OF THE PRODUCTS IS AT YOUR SOLE RISK. THE COMPANY MAKES NO
            REPRESENTATIONS, WARRANTIES OR GUARANTEES, EXPRESS OR IMPLIED,
            REGARDING <br /> (i) THE ACCURACY, RELIABILITY OR COMPLETENESS OF
            THE CONTENT ON THIS WEBSITE OR <br /> (ii) OF THE SERVICE AND
            PRODUCTS AND EXPRESSLY DISCLAIMS ANY WARRANTIES OF NON-INFRINGEMENT
            OR FITNESS FOR A PARTICULAR PURPOSE. THE COMPANY ENGAGES AND EMPLOY
            THE BEST METHODS TO SAFEGUARD AND PROTECT AGAINST VIRUSES,
            INFECTION., ETC, HOWEVER, DESPITE SUCH BEST EFFORTS, THE COMPANY
            MAKES NO REPRESENTATION, WARRANTY OR GUARANTEE THAT THE CONTENT THAT
            MAY BE AVAILABLE THROUGH THE SERVICE IS FREE OF INFECTION FROM ANY
            VIRUSES OR OTHER CODE OR COMPUTER PROGRAMMING ROUTINES THAT CONTAIN
            CONTAMINATING OR DESTRUCTIVE PROPERTIES OR THAT ARE INTENDED TO
            DAMAGE, SURREPTITOUSLY INTERCEPT OR EXPROPRIATE ANY SYSTEM, DATA OR
            PERSONAL INFORMATION. LIMITATION OF LIABILITY THE COMPANY SHALL IN
            NO EVENT BE RESPONSIBLE OR LIABLE TO YOU OR TO ANY THIRD PARTY,
            WHETHER IN CONTRACT, WARRANTY, TORT <br /> (INCLUDING NEGLIGENCE) OR
            OTHERWISE, FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL,
            EXEMPLARY, LIQUIDATED OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED
            TO LOSS OF PROFIT, REVENUE OR BUSINESS, BUSINESS INTERRUPTION, LOSS
            OF PROGRAMS OR INFORMATION, OR LOSS OF SAVINGS, OR ANY OTHER DAMAGES
            ARISING - IN ANY WAY, SHAPE OR FORM - OUT OF THE AVAILABILITY, USE,
            RELIANCE ON, OR INABILITY TO UTILIZE THE SERVICE ARISING IN WHOLE OR
            IN PART FROM YOUR ACCESS TO THIS WEBSITE, YOUR USE OF THE SERVICE,
            YOUR PURCHASE OF PRODUCTS THROUGH THE WEBSITE OR THIS AGREEMENT,
            EVEN IF THE COMPANY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
            DAMAGES. INDEMNITY BY YOU You shall defend, indemnify and hold
            harmless the Company and its officers, directors, shareholders, and
            employees, from and against all loss, damages, claims and expenses,
            including but not limited to attorneys fees, in whole or in part
            arising out of or attributable to any breach of this Agreement by
            You, any misrepresentation or misuse of the Service offered to You
            or any negligent or unreasonable or inappropriate use of the Website
            or the Services. TERMINATION This Agreement to be applicable and
            shall be binding on the parties, i.e., You and the Company, unless
            terminated as specified below: <br /> (a) by You, by providing a
            written notice of at least 3 <br /> (three ) business days; <br />{" "}
            (b) closure of Your account by the Company or You for any reason
            immediately; <br /> (c) The Company may terminate this Agreement and
            close Your account if it comes to the knowledge of the Company that
            You have breached any of these terms and conditions, whether
            intentionally or by implication;
            <br /> (d) The Company may terminate the Agreement, it is so
            required to be one by an express direction of law MISCELLANEOUS{" "}
            <br /> (a) The language in this Agreement shall be interpreted as to
            its fair meaning and not strictly for or against either party.{" "}
            <br /> (b) Should any part of this Agreement be held invalid or
            unenforceable, that portion shall be construed consistent with
            applicable law and the remaining portions shall remain in full force
            and effect without being impaired or invalidated in any way. <br />{" "}
            (c) To the extent that anything in or associated with the Website is
            in conflict or inconsistent with this Agreement, this Agreement
            shall take precedence. <br /> (d) Failure of the Company to enforce
            any provision of this Agreement shall not be deemed a waiver of such
            provision nor of the right to enforce such provision. <br /> (e)
            This Agreement may only be amended by either the same electronic
            means as were used to enter into this Agreement or in a writing that
            specifically refers to this Agreement, executed by both parties
            hereto.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}