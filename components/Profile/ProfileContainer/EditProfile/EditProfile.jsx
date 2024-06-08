import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "wagmi";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "@/context/TransactionProvider";
import { toast } from "react-toastify";




const RegisterForm = () => {

  const [walletaddress, setWalletAddress] = useState("Connect To With A Web3 Wallet")
  const [image, setImage] = useState({});

  const { address } = useAccount()

  const { profileImgUrl, setProfileImageUrl } = useContext(TransactionContext)

  useEffect(() => {
    if (!address) return
    getUsers(address);
    setWalletAddress(address)
  }, [address]);



  const getUsers = async (walletaddress) => {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ walletaddress }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((resp) => resp.json())
      .then((data) => {
        if (!data.user) {
          setProfileImageUrl("")
          return
        }
        setProfileImageUrl(data.user.imgUrl)
      })
      .catch((err) => {
        console.log(err)
      })


  }
  console.log(walletaddress, "walletaddress");
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!address || !image) return toast.error('Please fill in all fields.');
    let imgUrl = ""
    try {
      toast.info('Updating profile...');
      const imgData = new FormData()
      imgData.append("file", image)
      imgData.append("upload_preset", "k2ldqbj5")
      imgData.append("cloud_name", "ddus7dcj3")
      await fetch('https://api.cloudinary.com/v1_1/ddus7dcj3/image/upload', {
        method: 'POST',
        body: imgData,
      }).then((resp) => resp.json())
        .then((data) => {
          imgUrl = data.secure_url
          setProfileImageUrl(data.secure_url)
        })
        .catch((err) => {
          console.log(err)
        })
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletaddress, imgUrl }),
      });

      const data = await response.json();

      if (!data.user) {
        toast.error('Error updating profile. Please try again.');
        setProfileImageUrl(undefined)
        return
      }

      setProfileImageUrl(data.user.imgUrl)
      return toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile. Please try again.');
    }
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className="flex flex-col justify-center">
      <label className="text-white lg:text-3xl md:text-xl text-base font-semibold">
        Set Profile
      </label>

      <div className="w-full optionBG lg:mt-10 mt-5 rounded-xl text-white py-4 px-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center text-primary"
        >
          <div className="flex flex-col gap-10 mt-10 w-full lg:w-1/2 xl:w-[500px]">
            <div className="flex flex-col gap-4">
              <Label>Wallet Address</Label>
              <Button
                type="button"
                variant="outline"
                className="text-primary"
                disabled
              >
                {walletaddress}
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Profile Image</Label>
              <Button
                type="button"
                variant="outline"
                className="text-primary"
              >
                <Input
                  type="file"
                  disabled={profileImgUrl || !address}
                  onChange={handleImageChange}
                />

              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-10">
            <Button disabled={profileImgUrl || !address} variant="outline" className="text-primary">
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
