import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import type { Route } from "./+types/home";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };


  return (
    <main className="min-h-screen w-full p-10 max-w-7xl mx-auto">
      <div className="md:text-[120px] text-[50px] h-auto text-wrap
     text-center  tracking-[30px] relative z-1 w-full overflow-hidden">
        GENERATIONAL
      </div>
      {/* content */}

      <div className="grid md:grid-cols-2 
       gap-5 mt-20 mb-20">
        {/* image */}
        <div className="">
          <div className="md:text-5xl mb-2 font-medium text-3xl">CONTACT</div>
          <img src="/images/contact.png" alt="3 classic car" />
        </div>

        {/* contact form */}
        <div className="flex flex-col">
          <div className="md:text-5xl mb-2 font-medium text-3xl text-white"> .</div>
          <div className="text-xl font-semibold">TALK TO GENERATIONAL</div>
          <div className="grid font-medium mt-5 grid-cols-2">
            <div className="title">MOBILE&WHATSAPP </div>
            <div className="value">+66 85 1661256 </div>

            <div className="title">EMAIL </div>
            <div className="value">HELLO@GENERATIONAL.CO.TH</div>

            <div className="title">LINE ID </div>
            <div className="value">@GENERATIONAL</div>

            <div className="title">INSTAGRAM </div>
            <div className="value">@DRIVEGENERATIONAL</div>
          </div>

          {/* form */}

          <div className="mt-10">
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
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
              />
              <TextField
                name="mobile"
                label="MOBILE"
                variant="standard"
                value={form.mobile}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="email"
                label="EMAIL"
                variant="standard"
                value={form.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="subject"
                label="SUBJECT"
                variant="standard"
                value={form.subject}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="content"
                label="CONTENT"
                variant="outlined"
                value={form.content}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  maxWidth:200,
                  mt: 1,
                  bgcolor: "black",
                  color: "white",
                  borderRadius: 0,
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "#222",
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
