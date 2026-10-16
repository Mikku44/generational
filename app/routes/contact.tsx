import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { Route } from "./+types/home";
import Logo from "~/components/logo";
import { ContactService } from "services/contactService";
import { toast } from "sonner";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Contact GENERATIONAL Bangkok | Classic Car Enquiries — Thailand" },
    {
      name: "description",
      content:
        "Contact GENERATIONAL in Bangkok for classic car sourcing, sales and preservation. Call +66 91 991 1911, WhatsApp, LINE @generational or email HELLO@GENERATIONAL.CO.",
    },
    { tagName: "link", rel: "canonical", href: "https://www.generational.co/contact" },
    { property: "og:title", content: "Contact GENERATIONAL Bangkok | Classic Car Enquiries — Thailand" },
    {
      property: "og:description",
      content:
        "Talk to GENERATIONAL — Bangkok curators of culturally significant classic automobiles. Phone, WhatsApp, LINE, Instagram and email.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.generational.co/contact" },
    { property: "og:image", content: "https://www.generational.co/images/GRS00991.webp" },
    { property: "og:image:alt", content: "Classic cars curated by GENERATIONAL Thailand — contact us" },
    { property: "og:site_name", content: "GENERATIONAL" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact GENERATIONAL Bangkok | Classic Car Enquiries — Thailand" },
    {
      name: "twitter:description",
      content:
        "Talk to GENERATIONAL — Bangkok curators of culturally significant classic automobiles.",
    },
    { name: "twitter:image", content: "https://www.generational.co/images/GRS00991.webp" },
    { name: "twitter:image:alt", content: "Classic cars curated by GENERATIONAL Thailand — contact us" },
  ];
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic client-side validation check
    const isFormValid = Object.values(form).every(value => value.trim() !== "");

    if (!isFormValid) {
      toast.error("All fields are required. Please fill them out.");
      return; // Stop the function if validation fails
    }

    // 2. Wrap API call with toast.promise as before
    toast.promise(
      ContactService.create(form),
      {
        loading: "Submitting...",
        success: (result: any) => `Message sent successfully!\n Your ticket ID: ${result.id}`,
        error: "Something went wrong. Please try again.",
      }
    );
  };

  const textFieldStyles = {
    '& .MuiInputBase-input': {
      fontSize: '18px',
      fontWeight: 500, // font-medium
    },
    '& .MuiInputLabel-root': {
      fontSize: '18px',
      fontWeight: 500,
    },
  };



  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact GENERATIONAL",
    url: "https://www.generational.co/contact",
    about: { "@id": "https://www.generational.co/#organization" },
  };

  return (
    <main className="min-h-screen w-full mb-20 relative ">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <div className="md:p-10 p-5">
        <Logo />
      </div>
      {/* content */}

      <div className="grid md:grid-cols-12 container-x
        gap-5 md:mt-[220px] mt-[200px] mb-20  h-full overflow-hidden">
        {/* image */}
        <h1 className="md:col-span-7  md:text-[65px] text-[48px] md:leading-tight -mt-4 font-semibold -mb-4">CONTACT</h1>
        <div className="md:block hidden"></div>

        <div className="md:col-span-7 w-full h-full md:text-base text-[clamp(10px,0.575rem+0.25vw,12px)]">
          <div className="md:max-h-[780px] overflow-hidden h-full flex bg-black ">
            <img src="/images/GRS00991.webp" className="w-full h-full object-cover object-[50%_30%]" alt="Three curated classic cars by GENERATIONAL Thailand — contact our Bangkok showroom" />
          </div>
          <div className="lg:flex justify-end w-full mt-1 text-[#7C7C7C]">
            PHOTO CREDITS AND COPYRIGHT BELONG TO
            {/* <a href="https://roman-raetzke.de/" target="_blank" className="ml-1 hover:underline">ROMAN RÄTZKE</a> */}
            <span className=""> GENERATIONAL CO.,LTD.</span>
          </div>
        </div>

        {/* contact form */}
        <div className="md:mt-0 mt-16 md:col-span-5">
          <div className="text-[26px] -mt-3 font-bold">TALK TO GENERATIONAL</div>
          <div className="grid text-[18px] leading-6 font-semibold mt-5 md:grid-cols-3 gap-2">
            <div className="title break-words">MOBILE</div>
            <div className="grid md:col-span-2">
              <a href="tel:+66891991191"
                target="_blank"
                className="value break-words hover:opacity-60 md:font-semibold font-normal">+66 919 911 911</a>

            </div>


            <div className="title break-words">WHATSAPP </div>
            <div className="grid md:col-span-2">
              <a href="https://wa.me/66851661256"
                target="_blank"
                className="value break-words hover:opacity-60 md:font-semibold font-normal">+66 851 661 256</a>

            </div>


            <div className="title break-words">MOBILE (UNITED KINGDOM) </div>
            <a href="tel:+447500007008"
              target="_blank"
              className="value break-words hover:opacity-60 md:col-span-2 md:font-semibold font-normal">+44 7500 007 008</a>

            <div className="title break-words">EMAIL </div>
            <a
              href="mailto:HELLO@GENERATIONAL.CO"
              target="_blank"
              className="value break-words hover:opacity-60 md:col-span-2 md:font-semibold font-normal">HELLO@GENERATIONAL.CO</a>

            <div className="title break-words">LINE ID </div>
            <a href="https://line.me/R/ti/p/@generational"
              target="_blank"
              rel="noopener"
              className="value break-words hover:opacity-60 md:col-span-2 md:font-semibold font-normal">@GENERATIONAL</a>

            <div className="title break-words">INSTAGRAM </div>
            <a
              href="https://www.instagram.com/drivegenerational/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              className="value break-words hover:opacity-60 md:col-span-2 md:font-semibold font-normal">@DRIVEGENERATIONAL</a>
          </div>


          {/* form */}

          <div className="mt-10 text-[18px] font-medium">
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                fontSize: "18px",
                gap: 2,
              }}
            >
              <TextField
                name="name"
                label="NAME"
                variant="standard"
                value={form.name}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
                required
                InputLabelProps={{


                  required: false,
                }}
              />
              <TextField
                name="mobile"
                label="MOBILE"
                variant="standard"
                value={form.mobile}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
                required
                InputLabelProps={{


                  required: false,
                }}
              />
              <TextField
                name="email"
                label="EMAIL"
                variant="standard"
                value={form.email}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
                required
                InputLabelProps={{


                  required: false,
                }}
              />
              <TextField
                name="subject"
                label="SUBJECT"
                variant="standard"
                value={form.subject}
                onChange={handleChange}
                fullWidth
                sx={textFieldStyles}
                required
                InputLabelProps={{


                  required: false,
                }}
              />
              <TextField
                name="content"
                label="CONTENT"
                variant="outlined"
                className="z-0"
                value={form.content}
                onChange={handleChange}
                multiline
                InputProps={{
                  sx: {
                    borderRadius: 0,
                    fontSize: "18px",
                  },
                }}
                InputLabelProps={{
                  sx: { borderRadius: 0, fontSize: "18px", },

                  required: false,

                }}
                rows={2}
                fullWidth
                required

              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  maxWidth: 250,
                  mt: 1,
                  bgcolor: "black",
                  boxShadow: "none",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "medium",
                  borderRadius: 0,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#B2B2B2",
                    boxShadow: "none",
                    color: "black"
                  },
                }}
              >
                SUBMIT
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </main>
  )
}