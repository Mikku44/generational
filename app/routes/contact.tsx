import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { Route } from "./+types/home";
import Logo from "~/components/logo";
import { ContactService } from "services/contactService";
import { toast } from "sonner";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CONTACT - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
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



  return (
    <main className="min-h-screen w-full mb-20 relative ">
      <div className="md:p-10 p-5">
        <Logo />
      </div>
      {/* content */}

      <div className="grid md:grid-cols-12 container-x
        gap-5 md:mt-[220px] mt-[200px] mb-20  h-full overflow-hidden">
        {/* image */}
        <div className="md:col-span-7  md:text-[65px] text-[48px] md:leading-tight -mt-4 font-semibold -mb-4">CONTACT</div>
        <div className="md:block hidden"></div>

        <div className="md:col-span-7 w-full h-full">
          <div className="md:max-h-[640px] overflow-hidden h-full ">
            <img src="/images/246GTS Dino_crop.jpg" className="w-full h-full object-cover" alt="3 classic car" />
          </div>
          <div className="flex justify-end w-full mt-1 text-[#7C7C7C]">PHOTO CREDITS AND COPYRIGHT BELONG TO
            <a href="https://roman-raetzke.de/" target="_blank" className="ml-1 hover:underline">ROMAN RÄTZKE</a>
          </div>
        </div>

        {/* contact form */}
        <div className="md:mt-0 mt-16 md:col-span-5">
          <div className="text-[26px] -mt-3 font-bold">TALK TO GENERATIONAL</div>
          <div className="grid text-[18px] leading-6 font-semibold mt-5 md:grid-cols-3 gap-2">
            <div className="title break-words">MOBILE & WHATSAPP </div>
            <a href="tel:+66891991191"
              target="_blank"
              className="value break-words md:col-span-2 md:font-semibold font-normal">+66 919 911 911</a>

            <div className="title break-words">EMAIL </div>
            <a
              href="mailto:HELLO@GENERATIONAL.CO.TH"
              target="_blank"
              className="value break-words md:col-span-2 md:font-semibold font-normal">HELLO@GENERATIONAL.CO.TH</a>

            <div className="title break-words">LINE ID </div>
            <a href="#"
              target="_blank"
              className="value break-words md:col-span-2 md:font-semibold font-normal">@GENERATIONAL</a>

            <div className="title break-words">INSTAGRAM </div>
            <a
              href="https://www.instagram.com/drivegenerational/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              className="value break-words md:col-span-2 md:font-semibold font-normal">@DRIVEGENERATIONAL</a>
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