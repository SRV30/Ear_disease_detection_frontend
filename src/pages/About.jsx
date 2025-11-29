import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | EarCare AI Clinic</title>
        <meta
          name="description"
          content="Learn about EarCare AI Clinic, our mission, medical team, and how we use AI to support ENT specialists."
        />
      </Helmet>

      <section className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            About EarCare AI Clinic
          </h2>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed">
            EarCare AI Clinic blends medical expertise with artificial intelligence
            to detect ear infections and wax blockage from otoscopic images using
            deep learning. Our vision is to make ear care faster, affordable and
            accessible for every individual and every ENT clinic globally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "Provide AI assistance for early medical screening while ensuring doctors remain at the core of care.",
            },
            {
              title: "For Doctors",
              desc: "Grad-CAM visuals & probability charts empower ENT specialists to make faster, data-driven decisions.",
            },
            {
              title: "For Patients",
              desc: "Clear, human-readable reports improve patient confidence and understanding of their ear condition.",
            },
          ].map((box) => (
            <div
              key={box.title}
              className="bg-white backdrop-blur-lg border border-indigo-100 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-2">{box.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{box.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-6">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-10">
            Meet Our Expert Team
          </h3>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: "Sahil Raj Verma",
                role: "Model Training Specialist",
                avatar: "SRV",
                email: "sahil.verma@earcare-ai.com",
                phone: "+91 98745 22109",
              },
              {
                name: "Rajkumar Bairwa",
                role: "Frontend + Backend Developer",
                avatar: "RB",
                email: "rajkumar.bairwa@earcare-ai.com",
                phone: "+91 90134 87219",
              },
              {
                name: "Rakesh Saini",
                role: "Model Comparison & Evaluation",
                avatar: "RS",
                email: "rakesh.saini@earcare-ai.com",
                phone: "+91 77706 33107",
              },
              {
                name: "Sourabh Malhotra",
                role: "Frontend Developer",
                avatar: "SM",
                email: "sourabh.malhotra@earcare-ai.com",
                phone: "+91 82904 11592",
              },
            ].map((doc) => (
              <div
                key={doc.email}
                className="bg-white rounded-3xl border border-slate-200 shadow-xl px-7 py-6 flex gap-6 items-center hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md text-xl font-bold border-2 border-indigo-300">
                  {doc.avatar}
                </div>
                <div>
                  <p className="text-xl font-semibold text-slate-900">{doc.name}</p>
                  <p className="text-sm font-medium text-indigo-700 mb-2">{doc.role}</p>
                  <p className="text-sm text-slate-600">{doc.email}</p>
                  <p className="text-sm text-slate-600">{doc.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-3xl shadow-xl text-center px-6 py-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            “Human Intelligence + Artificial Intelligence = Future of Healthcare”
          </h3>
          <p className="text-sm md:text-base opacity-90 max-w-3xl mx-auto leading-relaxed">
            At EarCare AI Clinic we believe AI should empower doctors — not replace them.
            Together, we speed up diagnosis, reduce clinical load and offer smarter healthcare.
          </p>
        </div>
      </section>
    </>
  );
}
