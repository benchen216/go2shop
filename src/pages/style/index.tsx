import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
//import { signIn, signOut, useSession } from "next-auth/react";
//import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import Navbar2 from "../../components/navbar";
import { z } from "zod";

