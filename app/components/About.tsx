"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import logo from "@/public/rudra_pratap.jpg"

export default function About() {
    return (
        <section id="about" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <motion.h2
                    className="text-4xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    About Me
                </motion.h2>
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <motion.div
                        className="md:w-1/2 mb-8 md:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src={logo}
                            alt="Rudra Pratap"
                            width={400}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />
                    </motion.div>
                    <motion.div
                        className="md:w-1/2 md:pl-12"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg mb-6">
                            I&apos;m a passionate full-stack developer with a keen eye for design and a love for creating seamless user
                            experiences. With expertise in modern web technologies, I bring ideas to life through clean, efficient
                            code and stunning visuals.
                        </p>
                        <p className="text-lg mb-6">
                            My journey in tech started with a curiosity for how things work, which evolved into a career building
                            innovative digital solutions. I thrive on challenges and continuously expand my skill set to stay at the
                            forefront of web development.
                        </p>
                        <p className="text-lg">
                            When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or
                            enjoying the great outdoors. I believe in the power of technology to make a positive impact, and I&apos;m
                            always excited to take on new projects that push the boundaries of what&apos;s possible on the web.
                        </p>

                    </motion.div>
                </div>
            </div>
        </section>
    )
}

